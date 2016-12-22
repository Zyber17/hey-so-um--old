interface MessageItem {
	text: string;
	style: StyleFunction | null;
}
type MessageList    = MessageItem[];

interface SuggestionItem {
	text: string;
	next: MessageAndSuggestionItem | null;
}
type SuggestionList = SuggestionItem[];


interface MessageAndSuggestionItem {
	messages: MessageList;
	suggestions: SuggestionList;
}
type MessageAndSuggestionList = MessageAndSuggestionItem[];


interface StyleFunction {
	(elem: any): void
}
interface Listener{
	(e: any): any;
}
interface Continuation {
	(): any;
}

const messageFlow: MessageAndSuggestionList = [
	{
		messages: [{
			text: "Hi!",
			style: null
		}],
		suggestions: [
			{
				text: "hi there!",
				next: {
					messages: [
						{
							text: 'hi again!!!!',
							style: null
						}, {
							text: 'how\'s it going',
							style: null
 						}
					],
					suggestions: [
						{
							text: 'hey hey hey',
							next: null
						},
						{
							text: 'what is up',
							next: null
						}
					]
				}
			}
		]
	}
];

var messageLog;
var currentSuggestions;

function chatInit(): void {
	messageLog = $('#messageLog');
	currentSuggestions = $('#currentSuggestions');
	displayMessages(messageFlow[0].messages, () => {
		displaySuggestions(messageFlow[0].suggestions);
	});
}

function displayMessages(messageList: MessageList, continuation: Continuation | null) {
	messageList.forEach((message) => {
		messageLog.append(liConstructor(message.text, 'me', null));
	});
	if (continuation) {
		continuation();
	}
}

function displayResponse(response: string) {
	messageLog.append(liConstructor(response, 'you', null));
}

function displaySuggestions(suggestionList: SuggestionList) {
	currentSuggestions.children().remove(); // remove children

	suggestionList.forEach((suggestion) => {
		const cont = ((suggestion) => {
			if (suggestion.next) {
				return (e) => {
					displayResponse(suggestion.text);
					displayMessages(suggestion.next.messages, () => {
						displaySuggestions(suggestion.next.suggestions);
					});
				};
			} else {
				return (e) => {
					displayResponse(suggestion.text);
					currentSuggestions.children().remove();
				};
			}
		})(suggestion);
		let li = liConstructor(suggestion.text, null, cont);
		currentSuggestions.append(li);
	});
}

function liConstructor(text: string, cssClass: string | null, listener: Listener | null) {
	let li = document.createElement('li');

	let span = document.createElement('span');
	span.innerHTML = text;
	span.classList.add('message');

	li.appendChild(span);
	li.classList.add('new');

	if (cssClass != null) {
		li.classList.add(cssClass);
	}
	if (typeof listener === "function" && listener != null) {
		console.log(listener);
		li.addEventListener('click', listener);
	}
	return li;
}
