import 'dart:io';
import 'dart:convert';

class Contact {
  String name;
  String? email;
  String? phone;

  Contact({required this.name, this.email, this.phone});
}

const EXIT_COMMAND = 'exit';
const ADD_CONTACT_COMMAND = 'add';
const LIST_CONTACTS_COMMAND = 'list';

final List<Contact> contacts = [];

void addContact() {
  stdout.writeln('Enter contact name:');
  final name = stdin.readLineSync();
  if (name == null || name.isEmpty == true) {
    stdout.writeln('Name cannot be empty.');
    return;
  }

  stdout.write('Enter contact email (optional): ');
  final email = stdin.readLineSync();
  stdout.write('Enter contact phone (optional): ');
  final phone = stdin.readLineSync() ?? '';
  if (!RegExp(r'^\d*$').hasMatch(phone)) {
    stdout.writeln('Phone number must contain digits only.');
    return;
  }
  final contact = Contact(name: name, email: email, phone: phone);
  contacts.add(contact);
  stdout.writeln('Contact added: ${contact.name}');
}

void listContact() {
  if (contacts.isEmpty) {
    stdout.writeln('No contacts available.');
    return;
  }

  stdout.writeln('Contacts (${contacts.length}):');
  contacts.forEach(
    (contacts) => stdout.writeln(
      'Name: ${contacts.name}, Email: ${contacts.email?.isNotEmpty == true ? contacts.email : 'N/A'}, Phone: ${contacts.phone?.isNotEmpty == true ? contacts.phone : 'N/A'}',
    ),
  );
}

Future<void> loadContacts() async {
  final dataFile = File('contacts.data');

  if (await dataFile.exists() == false) {
    return;
  }
  try {
    final content = await dataFile.readAsString();
    final parsedContent = jsonDecode(content);
    for (var contact in parsedContent) {
      contacts.add(
        Contact(
          name: contact['name'],
          email: contact['email'],
          phone: contact['phone'],
        ),
      );
    }
  } catch (e) {
    stdout.writeln('Error loading contacts: $e');
  }
}

Future<void> saveContacts() async {
  final dataFile = File('contacts.data');
  final content = jsonEncode(
    contacts
        .map((c) => {'name': c.name, 'email': c.email, 'phone': c.phone})
        .toList(),
  );
  await dataFile.writeAsString(content);
}

void main(List<String> args) async {
  stdout.writeln('Welcome to Contact Manager!');
  stdout.writeln('Type "exit" to quit.');

  await loadContacts();

  while (true) {
    final command = stdin.readLineSync();

    switch (command) {
      case ADD_CONTACT_COMMAND:
        addContact();
        break;
      case LIST_CONTACTS_COMMAND:
        listContact();
        break;
      case EXIT_COMMAND:
        await saveContacts();
        stdout.writeln('Exiting Contact Manager. Goodbye!');
        return;
      default:
        stdout.writeln('Unknown command: $command');
        stdout.writeln(
          'Available commands: $ADD_CONTACT_COMMAND, $LIST_CONTACTS_COMMAND, $EXIT_COMMAND',
        );
    }
  }
}
