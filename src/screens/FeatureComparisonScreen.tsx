import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Button, Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FEATURES, PRICING } from "../constants/features";
import { COLORS } from "../constants/theme";
import { usePremiumStore } from "../store/premiumStore";
import { purchasePackage, getOfferings } from "../config/store";

export const FeatureComparisonScreen = () => {
  const { pro, premium, setEntitlements } = usePremiumStore();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (type: "pro" | "premium" | "bundle" | "lifetime") => {
    setLoading(true);
    try {
      const offerings = await getOfferings();
      let targetPackage;

      switch (type) {
        case "pro":
          targetPackage = offerings.find(p => p.identifier === "pro_lifetime");
          break;
        case "premium":
          targetPackage = offerings.find(p => p.identifier === "premium_annual");
          break;
        case "bundle":
          targetPackage = offerings.find(p => p.identifier === "pro_premium_bundle");
          break;
        case "lifetime":
          targetPackage = offerings.find(p => p.identifier === "premium_lifetime");
          break;
      }

      if (!targetPackage) {
        throw new Error("Package not found");
      }

      const entitlements = await purchasePackage(targetPackage);
      setEntitlements(entitlements);
    } catch (error) {
      // Purchase cancelled or failed
      console.error("Purchase failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderFeature = ({ id, name, description, availability }: (typeof FEATURES)[0]) => {
    const isAvailable =
      availability === "free" ||
      (availability === "pro" && (pro || premium)) ||
      (availability === "premium" && premium);

    return (
      <View key={id} style={styles.featureRow}>
        <View style={styles.featureInfo}>
          <Text style={styles.featureName}>{name}</Text>
          {description && <Text style={styles.featureDescription}>{description}</Text>}
        </View>
        <View style={styles.availabilityIndicator}>
          {isAvailable ? (
            <Icon name="check" type="feather" color={COLORS.primary} size={20} />
          ) : (
            <Icon name="lock" type="feather" color="#666" size={20} />
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.subtitle}>
            Unlock advanced features and get more accurate body fat calculations
          </Text>
        </View>

        <View style={styles.pricingCards}>
          {/* PRO Card */}
          <TouchableOpacity
            style={[styles.pricingCard, pro && styles.activeCard]}
            onPress={() => !pro && handlePurchase("pro")}
            disabled={pro || loading}
          >
            <Text style={styles.planName}>PRO</Text>
            <Text style={styles.planPrice}>{PRICING.pro.price}</Text>
            <Text style={styles.planType}>One-time purchase</Text>
            <Button
              title={pro ? "Purchased" : "Buy Now"}
              disabled={pro || loading}
              loading={loading}
              buttonStyle={[styles.buyButton, pro && styles.purchasedButton]}
              onPress={() => handlePurchase("pro")}
            />
          </TouchableOpacity>

          {/* Premium Card */}
          <TouchableOpacity
            style={[styles.pricingCard, premium && styles.activeCard]}
            onPress={() => !premium && handlePurchase("premium")}
            disabled={premium || loading}
          >
            <Text style={styles.planName}>PREMIUM</Text>
            <Text style={styles.planPrice}>{PRICING.premium.annual.price}</Text>
            <Text style={styles.planType}>Per year (save 50%)</Text>
            <Text style={styles.monthlyPrice}>or {PRICING.premium.monthly.price}/month</Text>
            <Button
              title={premium ? "Subscribed" : "Subscribe"}
              disabled={premium || loading}
              loading={loading}
              buttonStyle={[styles.buyButton, premium && styles.purchasedButton]}
              onPress={() => handlePurchase("premium")}
            />
          </TouchableOpacity>

          {/* Bundle Card */}
          {!pro && !premium && (
            <TouchableOpacity
              style={[styles.pricingCard, styles.bundleCard]}
              onPress={() => handlePurchase("bundle")}
              disabled={loading}
            >
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>BEST VALUE</Text>
              </View>
              <Text style={styles.planName}>PRO + 1 YEAR PREMIUM</Text>
              <Text style={styles.planPrice}>{PRICING.bundles.proWithPremium.price}</Text>
              <Text style={styles.planType}>Save {PRICING.bundles.proWithPremium.savings}</Text>
              <Button
                title="Get Bundle"
                loading={loading}
                buttonStyle={styles.buyButton}
                onPress={() => handlePurchase("bundle")}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          {FEATURES.map(renderFeature)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  pricingCards: {
    padding: 20,
  },
  pricingCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
  },
  activeCard: {
    backgroundColor: COLORS.primary + "10",
  },
  bundleCard: {
    backgroundColor: "#f0f8ff",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  planName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  planType: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  monthlyPrice: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
  },
  buyButton: {
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  purchasedButton: {
    backgroundColor: "#4CAF50",
  },
  saveBadge: {
    position: "absolute",
    top: -12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  saveBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  featureInfo: {
    flex: 1,
  },
  featureName: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 12,
    color: "#666",
  },
  availabilityIndicator: {
    marginLeft: 16,
  },
});
