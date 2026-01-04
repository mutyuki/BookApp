import { View, TextInput, FlatList, Text, StyleSheet } from "react-native";
import BookCard from "../components/BookCard";

export default function LibraryScreen({
	books,
	searchQuery,
	setSearchQuery,
	onPressBook,
	onDelete,
}) {
	const filteredBooks = books.filter(
		(book) =>
			book.title.includes(searchQuery) ||
			(book.author && book.author.includes(searchQuery)),
	);

	return (
		<View style={styles.container}>
			<View style={styles.searchBox}>
				<Text style={styles.searchBadge}>検索</Text>
				<TextInput
					style={styles.input}
					placeholder="タイトルや著者で検索..."
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
			</View>

			<FlatList
				data={filteredBooks}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<BookCard book={item} onPress={onPressBook} onDelete={onDelete} />
				)}
				contentContainerStyle={{ paddingBottom: 80 }}
				ListEmptyComponent={<Text style={styles.empty}>本がありません</Text>}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	searchBox: {
		flexDirection: "row",
		backgroundColor: "#fff",
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 16,
	},
	searchBadge: {
		marginRight: 8,
		fontSize: 14,
		fontWeight: "bold",
		color: "#007AFF",
		backgroundColor: "#f5f5f5",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 8,
		overflow: "hidden",
	},
	input: { flex: 1, fontSize: 18 },
	empty: { textAlign: "center", marginTop: 40, color: "#999", fontSize: 16 },
});
