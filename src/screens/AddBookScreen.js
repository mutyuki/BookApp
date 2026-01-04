import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AddBookScreen({ isbn, setIsbn, onAdd, loading }) {
  return (
    <View style={styles.container}>
      <Ionicons name="scan-circle-outline" size={80} color="#007AFF" />
      <Text style={styles.title}>新しい本の入荷</Text>
      <Text style={styles.desc}>
        本の裏にあるISBNコードを入力してください。{"\n"}
        データベースに登録されます（この時点では貸出されません）。
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
          <Text style={styles.btnText}>OpenBDから情報を取得して登録</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  desc: {
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
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
