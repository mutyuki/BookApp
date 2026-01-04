import { useState } from "react";
import {
	View,
	TextInput,
	FlatList,
	Text,
	StyleSheet,
	Platform,
} from "react-native";
import BookCard from "../components/BookCard";

export default function LibraryScreen({
	books,
	searchQuery,
	setSearchQuery,
	onPressBook,
	onDelete,
}) {
	const [isSearchFocused, setIsSearchFocused] = useState(false);

	const filteredBooks = books.filter(
		(book) =>
			book.title.includes(searchQuery) ||
			(book.author && book.author.includes(searchQuery)),
	);

	return (
		<View style={styles.container}>
			<View style={[styles.searchBox, isSearchFocused && styles.searchBoxFocused]}>
				<TextInput
					style={[styles.input, Platform.OS === "web" && styles.inputWeb]}
					placeholder="タイトルや著者で検索..."
					underlineColorAndroid="transparent"
					value={searchQuery}
					onChangeText={setSearchQuery}
					onFocus={() => setIsSearchFocused(true)}
					onBlur={() => setIsSearchFocused(false)}
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
		backgroundColor: "#fff",
		padding: 12,
		borderRadius: 8,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#ddd",
	},
	searchBoxFocused: {
		borderColor: "#007AFF",
	},
	input: {
		fontSize: 18,
	},
	inputWeb: { outlineStyle: "none" },
	empty: { textAlign: "center", marginTop: 40, color: "#999", fontSize: 16 },
});
