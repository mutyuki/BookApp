import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
	SafeAreaView,
	StatusBar,
	Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// ★★★ ここをあなたのProxmoxサーバーのIPに書き換える！ ★★★
// 例: 'http://192.168.0.14:5000'
const SERVER_URL = process.env.EXPO_PUBLIC_API_URL;

// ==========================================
// 1. 検索画面 (トップ画面)
// ==========================================
function SearchScreen({ navigation }) {
	const [query, setQuery] = useState(""); // 入力されたキーワード
	const [books, setBooks] = useState([]); // 検索結果のリスト

	// サーバーからデータを取得する関数
	const searchBooks = async () => {
		try {
			console.log(`検索開始: ${SERVER_URL}/api/books?query=${query}`);

			// Pythonサーバーにアクセス
			const response = await fetch(`${SERVER_URL}/api/books?query=${query}`, {
				headers: {
					"ngrok-skip-browser-warning": "true", // ★これが魔法の合言葉
				},
			});

			// データをJSONとして読み込む
			const json = await response.json();

			console.log("取得成功:", json.length + "件");
			setBooks(json);

			if (json.length === 0) {
				Alert.alert("検索結果", "該当する書籍が見つかりませんでした");
			}
		} catch (error) {
			console.error("通信エラー:", error);
			Alert.alert(
				"エラー",
				"サーバーに接続できません。\nIPアドレスやWifiを確認してください。",
			);
		}
	};

	// リストの1行分の表示設定
	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.card}
			onPress={() => navigation.navigate("Details", { book: item })} // タップしたら詳細画面へ
		>
			<View style={styles.bookIcon} />
			<View style={styles.textContainer}>
				<Text style={styles.bookTitle} numberOfLines={1}>
					{item.TITLE}
				</Text>
				<Text style={styles.bookAuthor}>{item.AUTHOR}</Text>
			</View>
			<Text style={styles.arrow}>›</Text>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<View style={styles.header}>
				<Text style={styles.headerTitle}>図書検索システム</Text>
			</View>

			<View style={styles.searchContainer}>
				<TextInput
					style={styles.input}
					value={query}
					onChangeText={setQuery}
					placeholder="書籍名または著者名"
					placeholderTextColor="#999"
				/>
				<TouchableOpacity style={styles.searchButton} onPress={searchBooks}>
					<Text style={styles.searchButtonText}>検索</Text>
				</TouchableOpacity>
			</View>

			<FlatList
				data={books}
				renderItem={renderItem}
				keyExtractor={(item) => item.ID.toString()}
				contentContainerStyle={styles.listContent}
				ListEmptyComponent={
					<Text style={styles.emptyText}>検索してください</Text>
				}
			/>
		</SafeAreaView>
	);
}

// ==========================================
// 2. 詳細画面 (タップ後の画面)
// ==========================================
function DetailScreen({ route }) {
	// 前の画面から渡されたデータを受け取る
	const { book } = route.params;

	// 項目を表示するだけのパーツ
	const DetailRow = ({ label, value }) => (
		<View style={styles.detailRow}>
			<Text style={styles.detailLabel}>{label}</Text>
			<Text style={styles.detailValue}>{value}</Text>
		</View>
	);

	return (
		<View style={styles.detailContainer}>
			<View style={styles.detailCard}>
				<Text style={styles.detailTitle}>{book.TITLE}</Text>
				<View style={styles.divider} />

				<DetailRow label="著者" value={book.AUTHOR} />
				<DetailRow label="出版社" value={book.PUBLISHER} />
				<DetailRow label="価格" value={`¥${book.PRICE}`} />
				<DetailRow label="ISBN" value={book.ISBN} />
				<DetailRow label="ID" value={book.ID} />
			</View>
		</View>
	);
}

// ==========================================
// 3. 全体の構成設定
// ==========================================
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Search"
				screenOptions={{
					headerStyle: { backgroundColor: "#5b9bd5" },
					headerTintColor: "#fff",
					headerTitleStyle: { fontWeight: "bold" },
				}}
			>
				<Stack.Screen
					name="Search"
					component={SearchScreen}
					options={{ title: "検索" }}
				/>
				<Stack.Screen
					name="Details"
					component={DetailScreen}
					options={{ title: "書籍詳細" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

// ==========================================
// 4. デザイン (CSSみたいなもの)
// ==========================================
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#f5f7fa" },
	header: { padding: 20, backgroundColor: "white", alignItems: "center" },
	headerTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },

	searchContainer: {
		flexDirection: "row",
		padding: 15,
		backgroundColor: "white",
		elevation: 2,
	},
	input: {
		flex: 1,
		backgroundColor: "#f0f0f0",
		padding: 12,
		borderRadius: 8,
		fontSize: 16,
		marginRight: 10,
		borderWidth: 1,
		borderColor: "#ddd",
	},
	searchButton: {
		backgroundColor: "#5b9bd5",
		paddingHorizontal: 20,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	searchButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },

	listContent: { padding: 15 },
	emptyText: { textAlign: "center", marginTop: 50, color: "#999" },

	// リストアイテムのデザイン
	card: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 15,
		marginBottom: 12,
		flexDirection: "row",
		alignItems: "center",
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	bookIcon: {
		width: 40,
		height: 50,
		backgroundColor: "#ddd",
		borderRadius: 4,
		marginRight: 15,
	},
	textContainer: { flex: 1 },
	bookTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 4,
	},
	bookAuthor: { fontSize: 14, color: "#666" },
	arrow: { fontSize: 24, color: "#ccc" },

	// 詳細画面のデザイン
	detailContainer: { flex: 1, padding: 20, backgroundColor: "#f5f7fa" },
	detailCard: {
		backgroundColor: "white",
		borderRadius: 12,
		padding: 25,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	detailTitle: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 15,
		textAlign: "center",
	},
	divider: { height: 1, backgroundColor: "#eee", marginBottom: 20 },
	detailRow: {
		flexDirection: "row",
		marginBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#f9f9f9",
		paddingBottom: 5,
	},
	detailLabel: { width: 80, fontSize: 14, color: "#888", fontWeight: "bold" },
	detailValue: { flex: 1, fontSize: 16, color: "#333" },
});
