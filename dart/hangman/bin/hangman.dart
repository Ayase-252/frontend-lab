import 'package:all_english_words/all_english_words.dart';
import 'dart:math';
import 'dart:io';

String maskWord(String word, Set<String> guessedLetters) {
  return word
      .split('')
      .map((letter) => guessedLetters.contains(letter) ? letter : '_')
      .join();
}

String makePlural(String word, int count) {
  if (count == 1) {
    return word;
  }

  if (word.endsWith('s')) {
    return word;
  }
  return '${word}s';
}

void main(List<String> arguments) async {
  final englishWords = await AllEnglishWords().allWords;

  print(
    'Welcome to Hangman!, there is ${englishWords.length} words available.',
  );

  final random = Random();
  final pickedWord = englishWords[random.nextInt(englishWords.length)];
  var remainingAttempts = 6;
  final guessedLetters = Set<String>();
  final rightLetters = Set<String>();
  pickedWord.split('').forEach((letter) => rightLetters.add(letter));
  while (remainingAttempts > 0) {
    print('Guess the word: ${maskWord(pickedWord, guessedLetters)}');

    final userInput = stdin.readLineSync();
    if (userInput == null || userInput.isEmpty) {
      print('Please enter a letter.');
      continue;
    }

    if (userInput.length > 1) {
      print('Please enter only one letter at a time.');
      continue;
    }

    if (guessedLetters.contains(userInput)) {
      print('You have already guessed that letter.');
      continue;
    }

    if (rightLetters.contains(userInput)) {
      print('Good Guess!');
      guessedLetters.add(userInput);
      rightLetters.remove(userInput);
      if (rightLetters.isEmpty) {
        print('Congratulations! You guessed the word: $pickedWord');
        return;
      }
      continue;
    }

    // wrong case
    remainingAttempts--;
    print(
      'Wrong guess! You have $remainingAttempts ${makePlural('attempts', remainingAttempts)} left.',
    );
  }

  print('Game Over! The word was: $pickedWord');
  print('Thanks for playing!');
}
