import 'package:flutter/material.dart';
import 'package:dart_openai/dart_openai.dart';
import 'package:aixdemo/env.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  OpenAI.apiKey = OPENAPI_API_KEY;
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
      
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final TextEditingController _controller = TextEditingController();
  String _response = '';

  Future<void> _sendMessage() async {
    final String message = _controller.text;
    if (message.isEmpty) return;

    setState(() {
      _response = 'Loading...';
    });

    final OpenAIChatCompletionModel completion = await OpenAI.instance.chat.create(
      model: "gpt-3.5-turbo",
      messages: [
        OpenAIChatCompletionChoiceMessageModel(
          role: OpenAIChatMessageRole.user,
          content: [OpenAIChatCompletionChoiceMessageContentItemModel.text(message)],
        ),
      ],
      maxTokens: 100,
    );
    print(completion.choices.first.finishReason);

    setState(() {
      _response = completion.choices.first.message.content?.first.text ?? '';
    });
  }

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Expanded(child: Text(_response)),
            TextField(
              controller: _controller,
              maxLines: 2,
              decoration: InputDecoration(
                hintText: 'Type a message...',
                suffixIcon: IconButton(
                  icon: Icon(Icons.send),
                  onPressed: _sendMessage,
                ),
              ),
            ),
          ],
        ),
      ),
     
    );
  }
}
