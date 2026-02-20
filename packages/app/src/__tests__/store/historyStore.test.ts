import type { MeasurementRecord } from '../../store/historyStore'
import { useHistoryStore } from '../../store/historyStore'

jest.mock('expo-crypto', () => ({
  randomUUID: jest.fn(() => 'test-uuid-' + Math.random().toString(36).slice(2, 8)),
}))

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { version: '1.0.0' } },
}))

jest.mock('react-native', () => ({
  Platform: { OS: 'ios' },
}))

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}))

const createMeasurementParams = (overrides = {}) => ({
  formula: 'ymca' as const,
  gender: 'male' as const,
  measurementSystem: 'metric' as const,
  inputs: { weight: 80, waistCircumference: 85 },
  bodyFatPercentage: 20,
  fatMass: 16,
  leanMass: 64,
  classification: 'Acceptable (18-25%)',
  ...overrides,
})

describe('useHistoryStore', () => {
  beforeEach(() => {
    useHistoryStore.setState({
      measurements: [],
      cloudSyncEnabled: false,
      lastSyncedAt: null,
      _hasHydrated: false,
    })
  })

  describe('addMeasurement', () => {
    it('creates a record with auto-generated clientId and timestamps', () => {
      const params = createMeasurementParams()
      const record = useHistoryStore.getState().addMeasurement(params)

      expect(record.clientId).toMatch(/^test-uuid-/)
      expect(record.measuredAt).toBeTruthy()
      expect(new Date(record.measuredAt).getTime()).not.toBeNaN()
      expect(record.deletedAt).toBeNull()
      expect(record.syncedAt).toBeNull()
      expect(record.version).toBe(record.measuredAt)
    })

    it('sets appVersion from Constants and platform from Platform.OS', () => {
      const params = createMeasurementParams()
      const record = useHistoryStore.getState().addMeasurement(params)

      expect(record.appVersion).toBe('1.0.0')
      expect(record.platform).toBe('ios')
    })

    it('prepends to the measurements array', () => {
      const { addMeasurement } = useHistoryStore.getState()
      const first = addMeasurement(createMeasurementParams({ bodyFatPercentage: 20 }))
      const second = addMeasurement(createMeasurementParams({ bodyFatPercentage: 22 }))

      const measurements = useHistoryStore.getState().measurements
      expect(measurements).toHaveLength(2)
      expect(measurements[0]!.clientId).toBe(second.clientId)
      expect(measurements[1]!.clientId).toBe(first.clientId)
    })

    it('stores all provided params on the record', () => {
      const params = createMeasurementParams({
        formula: 'navy' as const,
        gender: 'female' as const,
        measurementSystem: 'imperial' as const,
      })
      const record = useHistoryStore.getState().addMeasurement(params)

      expect(record.formula).toBe('navy')
      expect(record.gender).toBe('female')
      expect(record.measurementSystem).toBe('imperial')
      expect(record.bodyFatPercentage).toBe(20)
      expect(record.fatMass).toBe(16)
      expect(record.leanMass).toBe(64)
      expect(record.classification).toBe('Acceptable (18-25%)')
    })
  })

  describe('deleteMeasurement', () => {
    it('sets deletedAt to an ISO timestamp', () => {
      const record = useHistoryStore.getState().addMeasurement(createMeasurementParams())
      useHistoryStore.getState().deleteMeasurement(record.clientId)

      const updated = useHistoryStore
        .getState()
        .measurements.find((m) => m.clientId === record.clientId)
      expect(updated!.deletedAt).toBeTruthy()
      expect(new Date(updated!.deletedAt!).getTime()).not.toBeNaN()
    })

    it('clears syncedAt to null to trigger re-sync', () => {
      const record = useHistoryStore.getState().addMeasurement(createMeasurementParams())
      // Simulate that the record was previously synced
      useHistoryStore.setState((state) => ({
        measurements: state.measurements.map((m) =>
          m.clientId === record.clientId ? { ...m, syncedAt: '2024-01-01T00:00:00.000Z' } : m,
        ),
      }))

      useHistoryStore.getState().deleteMeasurement(record.clientId)

      const updated = useHistoryStore
        .getState()
        .measurements.find((m) => m.clientId === record.clientId)
      expect(updated!.syncedAt).toBeNull()
    })

    it('does not affect other records', () => {
      const first = useHistoryStore.getState().addMeasurement(createMeasurementParams())
      const second = useHistoryStore.getState().addMeasurement(createMeasurementParams())

      useHistoryStore.getState().deleteMeasurement(first.clientId)

      const secondRecord = useHistoryStore
        .getState()
        .measurements.find((m) => m.clientId === second.clientId)
      expect(secondRecord!.deletedAt).toBeNull()
    })
  })

  describe('getActiveMeasurements', () => {
    it('returns records where deletedAt is null', () => {
      useHistoryStore.getState().addMeasurement(createMeasurementParams())
      useHistoryStore.getState().addMeasurement(createMeasurementParams())

      const active = useHistoryStore.getState().getActiveMeasurements()
      expect(active).toHaveLength(2)
    })

    it('excludes soft-deleted records', () => {
      const record = useHistoryStore.getState().addMeasurement(createMeasurementParams())
      useHistoryStore.getState().addMeasurement(createMeasurementParams())

      useHistoryStore.getState().deleteMeasurement(record.clientId)

      const active = useHistoryStore.getState().getActiveMeasurements()
      expect(active).toHaveLength(1)
      expect(active[0]!.clientId).not.toBe(record.clientId)
    })
  })

  describe('getUnsyncedMeasurements', () => {
    it('returns records where syncedAt is null', () => {
      useHistoryStore.getState().addMeasurement(createMeasurementParams())
      useHistoryStore.getState().addMeasurement(createMeasurementParams())

      const unsynced = useHistoryStore.getState().getUnsyncedMeasurements()
      expect(unsynced).toHaveLength(2)
    })

    it('excludes synced records', () => {
      const record = useHistoryStore.getState().addMeasurement(createMeasurementParams())
      useHistoryStore.getState().addMeasurement(createMeasurementParams())

      useHistoryStore.getState().markSynced([record.clientId])

      const unsynced = useHistoryStore.getState().getUnsyncedMeasurements()
      expect(unsynced).toHaveLength(1)
      expect(unsynced[0]!.clientId).not.toBe(record.clientId)
    })
  })

  describe('markSynced', () => {
    it('sets syncedAt for given clientIds', () => {
      const first = useHistoryStore.getState().addMeasurement(createMeasurementParams())
      const second = useHistoryStore.getState().addMeasurement(createMeasurementParams())

      useHistoryStore.getState().markSynced([first.clientId, second.clientId])

      const measurements = useHistoryStore.getState().measurements
      expect(measurements[0]!.syncedAt).toBeTruthy()
      expect(measurements[1]!.syncedAt).toBeTruthy()
    })

    it('does not affect records not in the clientIds list', () => {
      const first = useHistoryStore.getState().addMeasurement(createMeasurementParams())
      const second = useHistoryStore.getState().addMeasurement(createMeasurementParams())

      useHistoryStore.getState().markSynced([first.clientId])

      const secondRecord = useHistoryStore
        .getState()
        .measurements.find((m) => m.clientId === second.clientId)
      expect(secondRecord!.syncedAt).toBeNull()
    })
  })

  describe('mergeFromCloud', () => {
    it('adds new records not present locally with syncedAt set', () => {
      const cloudRecord: MeasurementRecord = {
        clientId: 'cloud-record-1',
        formula: 'navy',
        gender: 'female',
        measurementSystem: 'metric',
        inputs: { weight: 65, waistCircumference: 70 },
        bodyFatPercentage: 25,
        fatMass: 16.25,
        leanMass: 48.75,
        classification: 'Acceptable',
        measuredAt: '2024-06-01T12:00:00.000Z',
        deletedAt: null,
        version: '2024-06-01T12:00:00.000Z',
        appVersion: '1.0.0',
        platform: 'ios',
        syncedAt: null,
        photoUri: null,
        hasPhoto: false,
      }

      useHistoryStore.getState().mergeFromCloud([cloudRecord])

      const measurements = useHistoryStore.getState().measurements
      expect(measurements).toHaveLength(1)
      expect(measurements[0]!.clientId).toBe('cloud-record-1')
      expect(measurements[0]!.syncedAt).toBeTruthy()
    })

    it('applies cloud deletions when local record is not deleted', () => {
      const localRecord = useHistoryStore.getState().addMeasurement(createMeasurementParams())

      const cloudVersion: MeasurementRecord = {
        ...localRecord,
        deletedAt: '2024-06-15T12:00:00.000Z',
      }

      useHistoryStore.getState().mergeFromCloud([cloudVersion])

      const updated = useHistoryStore
        .getState()
        .measurements.find((m) => m.clientId === localRecord.clientId)
      expect(updated!.deletedAt).toBe('2024-06-15T12:00:00.000Z')
    })

    it('sorts by measuredAt descending after merge', () => {
      useHistoryStore.getState().addMeasurement(createMeasurementParams())

      const olderCloud: MeasurementRecord = {
        clientId: 'cloud-older',
        formula: 'ymca',
        gender: 'male',
        measurementSystem: 'metric',
        inputs: { weight: 80, waistCircumference: 85 },
        bodyFatPercentage: 20,
        fatMass: 16,
        leanMass: 64,
        classification: 'Acceptable',
        measuredAt: '2020-01-01T00:00:00.000Z',
        deletedAt: null,
        version: '2020-01-01T00:00:00.000Z',
        appVersion: '1.0.0',
        platform: 'ios',
        syncedAt: null,
        photoUri: null,
        hasPhoto: false,
      }

      useHistoryStore.getState().mergeFromCloud([olderCloud])

      const measurements = useHistoryStore.getState().measurements
      expect(measurements).toHaveLength(2)
      // Most recent first
      expect(new Date(measurements[0]!.measuredAt).getTime()).toBeGreaterThan(
        new Date(measurements[1]!.measuredAt).getTime(),
      )
    })

    it('deduplicates by clientId and does not add existing records again', () => {
      const localRecord = useHistoryStore.getState().addMeasurement(createMeasurementParams())

      const duplicate: MeasurementRecord = {
        ...localRecord,
        deletedAt: null,
      }

      useHistoryStore.getState().mergeFromCloud([duplicate])

      const measurements = useHistoryStore.getState().measurements
      expect(measurements).toHaveLength(1)
    })
  })
})
