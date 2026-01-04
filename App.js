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
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// APIとコンポーネントの読み込み
import * as api from "./src/api";
import LibraryScreen from "./src/screens/LibraryScreen";
import AddBookScreen from "./src/screens/AddBookScreen";
import BookDetailModal from "./src/components/BookDetailModal";

export default function App() {
	// --- 状態管理 (State) ---
	const [activeTab, setActiveTab] = useState("library"); // 'library' or 'add'
	const [books, setBooks] = useState([]);
	const [searchQuery, setSearchQuery] = useState(""); // 検索キーワード
	const [newIsbn, setNewIsbn] = useState(""); // 入荷用ISBN
	const [isLoading, setIsLoading] = useState(false); // ロード中フラグ

	// 詳細モーダル用の状態
	const [detailModalVisible, setDetailModalVisible] = useState(false);
	const [selectedBook, setSelectedBook] = useState(null);

	// --- 起動時の処理 ---
	useEffect(() => {
		loadBooks();
	}, []);

	// --- 機能 (Actions) ---

	// 本の一覧を取得
	const loadBooks = async () => {
		const data = await api.getBooks();
		setBooks(data);
	};

	// 本を入荷 (ISBN連携)
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

	// 本を削除
	const executeDelete = async (id) => {
		await api.deleteBook(id);
		loadBooks();
	};

	// 本がタップされたとき (詳細を表示)
	const handlePressBook = (book) => {
		setSelectedBook(book);
		setDetailModalVisible(true);
	};

	// Webとスマホ両方でアラートを出すためのヘルパー関数
	const alertWebCompat = (title, msg) => {
		if (Platform.OS === "web") {
			window.alert(`${title}\n${msg}`);
		} else {
			Alert.alert(title, msg);
		}
	};

	// --- 画面描画 (Render) ---
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<StatusBar style="auto" />

				{/* ヘッダーエリア */}
				<View style={styles.header}>
					<Text style={styles.headerTitle}>自分の本db</Text>
				</View>

				{/* メインコンテンツエリア (タブで切り替え) */}
				<View style={styles.content}>
					{activeTab === "library" ? (
						// 本棚画面
						<LibraryScreen
							books={books}
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							onPressBook={handlePressBook} // 詳細表示用
							onDelete={executeDelete} // 削除用
						/>
					) : (
						// 入荷画面
						<AddBookScreen
							isbn={newIsbn}
							setIsbn={setNewIsbn}
							onAdd={handleAddBook}
							loading={isLoading}
						/>
					)}
				</View>

				{/* 下部タブバー */}
				<View style={styles.tabBar}>
					<TouchableOpacity
						style={styles.tabItem}
						onPress={() => setActiveTab("library")}
					>
						<Ionicons
							name="library"
							size={24}
							color={activeTab === "library" ? "#007AFF" : "#999"}
						/>
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
						<Ionicons
							name="add-circle"
							size={24}
							color={activeTab === "add" ? "#007AFF" : "#999"}
						/>
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

				{/* 詳細モーダル (必要なときだけ表示) */}
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
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		padding: 16,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	headerTitle: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#007AFF",
	},
	content: {
		flex: 1,
		padding: 16,
	},
	tabBar: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#eee",
		paddingBottom: 20,
		paddingTop: 10,
	},
	tabItem: {
		flex: 1,
		alignItems: "center",
	},
	tabText: {
		fontSize: 10,
		marginTop: 4,
		color: "#999",
	},
	activeTabText: {
		color: "#007AFF",
		fontWeight: "bold",
	},
});
