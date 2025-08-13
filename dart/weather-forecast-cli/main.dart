import 'package:http/http.dart' as http;
import 'dart:convert';
import './config.dart';

class WeatherInfo {
  final String location;
  final num temperature;
  final String condition;

  WeatherInfo({
    required this.location,
    required this.temperature,
    required this.condition,
  });

  @override
  String toString() {
    return 'Weather in $location: $temperature°C, Condition: $condition';
  }
}

Future<WeatherInfo> makeWeatherRequest(String cityName) async {
  final urlEndpoint = Uri.https('api.weatherapi.com', '/v1/current.json', {
    'key': apiKey,
    'q': cityName,
  });

  final response = await http.get(urlEndpoint);
  final result = jsonDecode(response.body);
  return WeatherInfo(
    location: result['location']['name'],
    temperature: result['current']['temp_c'],
    condition: result['current']['condition']['text'],
  );
}

void main(List<String> args) async {
  if (args.isEmpty) {
    print('Please provide a city name.');
    return;
  }

  final cityName = args[0];
  final result = await makeWeatherRequest(cityName);
  print(result);
}
