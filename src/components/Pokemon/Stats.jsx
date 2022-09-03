import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Stats(props) {
  const { stats } = props;

  const getBarStyle = (num) => {
    const color = num > 49 ? "#00ac17" : "#ff3e3e";

    return {
      width: `${num}%`,
      backgroundColor: color,
    };
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Base Stast</Text>
      {stats.map((item) => (
        <View>
          <View key={item.stat.name} style={styles.block}>
            <View style={styles.blockTitle}>
              <Text style={styles.statName}>{item.stat.name}</Text>
            </View>
            <View style={styles.blockInfo}>
              <Text style={styles.number}>{item.base_stat}</Text>
              <View style={styles.bgBarra}>
                <View style={[styles.bar, getBarStyle(item.base_stat)]} />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
  },
  block: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  blockTitle: {
    width: "30%",
  },
  statName: {
    textTransform: "capitalize",
    fontSize: 12,
    color: "#6b6b6b",
  },
  blockInfo: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    width: "12%",
    fontSize: 12,
  },
  bgBarra: {
    backgroundColor: "#dedede",
    width: "88%",
    height: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  bar: {
    // backgroundColor: "red",
    // width: "100%",
    height: 5,
    borderRadius: 20,
  },
});
