import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function AddBookScreen({ isbn, setIsbn, onAdd, loading }) {
  return (
    <View style={styles.container}>
      <View style={styles.spacer} />

      <View style={styles.content}>
        <Text style={styles.title}>新しい本の入荷</Text>
        <Text style={styles.desc}>
          本の裏にあるISBNコードを入力してください。{"\n"}
          データベースに登録されます。
        </Text>

        <TextInput
          style={styles.input}
          placeholder="例: 9784..."
          keyboardType="numeric"
          value={isbn}
          onChangeText={setIsbn}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabled]}
          onPress={onAdd}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>OpenBDを検索して追加</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  spacer: {
    flex: 1,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 14,
  },
  desc: {
    color: "#666",
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 26,
    fontSize: 18,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    fontSize: 22,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  disabled: { backgroundColor: "#aaa" },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
