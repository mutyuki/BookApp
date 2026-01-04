import { View, TextInput, FlatList, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
				<Ionicons name="search" size={20} color="#888" />
				<TextInput
					style={styles.input}
					placeholder="蔵書を検索..."
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
			</View>

			<FlatList
				data={filteredBooks}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<BookCard
						book={item}
						onPress={onPressBook}
						onDelete={onDelete}
					/>
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
		padding: 10,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 16,
	},
	input: { marginLeft: 8, flex: 1, fontSize: 16 },
	empty: { textAlign: "center", marginTop: 40, color: "#999" },
});
