import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookDetailModal({ visible, book, onClose }) {
  if (!book) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>閉じる</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.imageContainer}>
            {book.image_url ? (
              <Image
                source={{ uri: book.image_url }}
                style={styles.coverImage}
              />
            ) : (
              <View style={[styles.coverImage, styles.noImage]}>
                <Text>No Image</Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>

          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>
              出版社: {book.publisher || "不明"}
            </Text>
            <Text style={styles.metaText}>
              出版日: {book.pubdate || "不明"}
            </Text>
            <Text style={styles.metaText}>ISBN: {book.isbn}</Text>
          </View>

          <View style={styles.descContainer}>
            <Text style={styles.descTitle}>あらすじ</Text>
            <Text style={styles.descText}>
              {book.description || "あらすじ情報はありません。"}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 16, alignItems: "flex-end" },
  closeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  closeText: { fontSize: 14, fontWeight: "bold", color: "#333" },

  content: { padding: 20, alignItems: "center", paddingBottom: 50 },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  coverImage: {
    width: 140,
    height: 200,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  noImage: { justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  author: { fontSize: 16, color: "#666", marginBottom: 16 },
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 24,
  },
  metaText: {
    fontSize: 12,
    color: "#888",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  descContainer: { width: "100%", alignItems: "flex-start" },
  descTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  descText: { fontSize: 15, lineHeight: 24, color: "#444" },
});
