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
                <Text style={styles.noImageText}>No Image</Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>著者: {book.author}</Text>

          <View style={styles.infoCard}>
            <Text style={styles.sectionLabel}>書籍情報</Text>
            
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>出版社</Text>
                <Text style={styles.infoValue}>{book.publisher || "不明"}</Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>出版日</Text>
                <Text style={styles.infoValue}>{book.pubdate || "不明"}</Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>ISBN</Text>
                <Text style={styles.infoValue}>{book.isbn}</Text>
              </View>
            </View>
          </View>

          <View style={styles.descCard}>
            <Text style={styles.sectionLabel}>あらすじ</Text>
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
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { 
    padding: 16, 
    alignItems: "flex-end",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  closeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#6366f1",
    borderRadius: 20,
  },
  closeText: { fontSize: 14, fontWeight: "bold", color: "#fff" },

  content: { padding: 20, alignItems: "center", paddingBottom: 50 },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 24,
    borderRadius: 12,
  },
  coverImage: {
    width: 160,
    height: 230,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  noImage: { justifyContent: "center", alignItems: "center" },
  noImageText: { color: "#999", fontSize: 14 },
  
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#1a1a2e",
    paddingHorizontal: 10,
  },
  author: { 
    fontSize: 16, 
    color: "#6366f1", 
    marginBottom: 24,
    fontWeight: "500",
  },

  infoCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 16,
  },
  infoRow: {
    paddingVertical: 12,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  infoDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
  },

  descCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  descText: { 
    fontSize: 15, 
    lineHeight: 26, 
    color: "#555",
    textAlign: "justify",
  },
});
