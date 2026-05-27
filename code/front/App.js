import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import * as api from "./src/api";
import LibraryScreen from "./src/screens/LibraryScreen";
import AddBookScreen from "./src/screens/AddBookScreen";
import BookDetailModal from "./src/components/BookDetailModal";

export default function App() {
  // --- State ---
  const [activeTab, setActiveTab] = useState("library");
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newIsbn, setNewIsbn] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // --- Effects ---
  useEffect(() => {
    loadBooks();
  }, []);

  // --- Actions ---
  const loadBooks = async () => {
    const data = await api.getBooks();
    setBooks(data);
  };

  const handleAddBook = async () => {
    if (newIsbn.length < 10) {
      alertWebCompat("エラー", "正しいISBNを入力してください");
      return;
    }
    setIsLoading(true);
    const res = await api.addBookByIsbn(newIsbn);
    setIsLoading(false);

    if (res.status === 201) {
      const data = await res.json();
      alertWebCompat("成功", `「${data.title}」を入荷しました`);
      setNewIsbn("");
      loadBooks();
      setActiveTab("library");
    } else if (res.status === 409) {
      alertWebCompat("お知らせ", "その本は既に登録されています");
    } else {
      alertWebCompat("エラー", "本の情報が見つかりませんでした");
    }
  };

  const executeDelete = async (id) => {
    await api.deleteBook(id);
    loadBooks();
  };

  const handlePressBook = (book) => {
    setSelectedBook(book);
    setDetailModalVisible(true);
  };

  const alertWebCompat = (title, msg) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n${msg}`);
    } else {
      Alert.alert(title, msg);
    }
  };

  // --- Render ---
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>MyLib</Text>
        </View>

        <View style={styles.content}>
          {activeTab === "library" ? (
            <LibraryScreen
              books={books}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onPressBook={handlePressBook}
              onDelete={executeDelete}
            />
          ) : (
            <AddBookScreen
              isbn={newIsbn}
              setIsbn={setNewIsbn}
              onAdd={handleAddBook}
              loading={isLoading}
            />
          )}
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab("library")}
          >
            <Text
              style={[
                styles.tabMark,
                activeTab === "library" && styles.activeTabMark,
              ]}
            >
              LIB
            </Text>
            <Text
              style={[
                styles.tabText,
                activeTab === "library" && styles.activeTabText,
              ]}
            >
              本棚
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab("add")}
          >
            <Text
              style={[styles.tabMark, activeTab === "add" && styles.activeTabMark]}
            >
              ADD
            </Text>
            <Text
              style={[
                styles.tabText,
                activeTab === "add" && styles.activeTabText,
              ]}
            >
              入荷
            </Text>
          </TouchableOpacity>
        </View>

        <BookDetailModal
          visible={detailModalVisible}
          book={selectedBook}
          onClose={() => setDetailModalVisible(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#007AFF" },
  content: { flex: 1, padding: 16 },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingBottom: 20,
    paddingTop: 10,
  },
  tabItem: { flex: 1, alignItems: "center" },
  tabMark: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#999",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  activeTabMark: {
    color: "#007AFF",
    borderColor: "#007AFF",
  },
  tabText: { fontSize: 12, marginTop: 4, color: "#999" },
  activeTabText: { color: "#007AFF", fontWeight: "bold" },
});
