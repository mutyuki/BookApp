import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Alert,
	Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BookCard({ book, onPress, onDelete }) {
	// 削除ボタンが押されたときの処理
	const handlePressDelete = () => {
		// Webブラウザかスマホかで確認ダイアログを出し分ける
		if (Platform.OS === "web") {
			if (window.confirm(`「${book.title}」を削除しますか？`)) {
				onDelete(book.id);
			}
		} else {
			Alert.alert("削除確認", `「${book.title}」を削除しますか？`, [
				{ text: "キャンセル", style: "cancel" },
				{
					text: "削除",
					style: "destructive",
					onPress: () => onDelete(book.id),
				},
			]);
		}
	};

	return (
		// カード全体をタップ可能にする (詳細表示のため)
		<TouchableOpacity
			style={styles.card}
			onPress={() => onPress(book)}
			activeOpacity={0.7}
		>
			{/* 表紙画像 (なければ No Image) */}
			{book.image_url ? (
				<Image source={{ uri: book.image_url }} style={styles.coverImage} />
			) : (
				<View style={[styles.coverImage, styles.noImage]}>
					<Text style={styles.noImageText}>No Image</Text>
				</View>
			)}

			{/* 右側の情報エリア */}
			<View style={styles.infoContainer}>
				<View style={styles.headerRow}>
					{/* 出版社を表示 */}
					<Text style={styles.publisher}>{book.publisher}</Text>

					{/* ゴミ箱アイコン (親のonPressが反応しないようにする) */}
					<TouchableOpacity onPress={handlePressDelete} hitSlop={10}>
						<Ionicons name="trash-outline" size={20} color="#999" />
					</TouchableOpacity>
				</View>

				<Text style={styles.title} numberOfLines={2}>
					{book.title}
				</Text>
				<Text style={styles.author}>{book.author}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 12,
		marginBottom: 16,
		padding: 12,
		// 影の設定 (iOS/Android)
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	coverImage: {
		width: 70,
		height: 100,
		borderRadius: 6,
		backgroundColor: "#eee",
	},
	noImage: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ccc",
	},
	noImageText: {
		fontSize: 10,
		color: "#666",
	},
	infoContainer: {
		flex: 1,
		marginLeft: 12,
		justifyContent: "center",
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 4,
	},
	publisher: {
		fontSize: 10,
		color: "#999",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 4,
	},
	author: {
		fontSize: 12,
		color: "#666",
	},
});
