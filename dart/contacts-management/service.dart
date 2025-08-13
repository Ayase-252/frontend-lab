import 'package:sqlite3/sqlite3.dart';
import './models/contacts.dart';

void main() {
  print(Contact.getAllContacts()[0].id);
}
