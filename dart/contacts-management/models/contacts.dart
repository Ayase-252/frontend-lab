import 'package:sqlite3/sqlite3.dart';

class DatabaseManager {
  static Database? _instance;

  static Database get db {
    _instance ??= _initDatabase();
    return _instance!;
  }

  static Database _initDatabase() {
    final db = sqlite3.open('contacts.db');
    db.execute('''
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT
      )
    ''');
    return db;
  }

  static void close() {
    _instance?.dispose();
    _instance = null;
  }
}

class Contact {
  int id;
  String name;
  String? email;
  String? phone;

  Contact({required this.id, required this.name, this.email, this.phone});

  static List<Contact> getAllContacts() {
    final rows = DatabaseManager.db.select('''
      SELECT * FROM contacts
      ''');

    return rows
        .map(
          (row) => Contact(
            id: row['id'] as int,
            name: row['name'] as String,
            email: row['email'] as String?,
            phone: row['phone'] as String?,
          ),
        )
        .toList();
  }
}
