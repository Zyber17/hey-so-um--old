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

const delay = 600;
var messageLog: HTMLElement;
var currentSuggestions: HTMLElement;

function chatInit(): void {
	messageLog = document.getElementById('messageLog');
	currentSuggestions = document.getElementById('currentSuggestions');
	displayMessages(messageFlow[0].messages, () => {
		displaySuggestions(messageFlow[0].suggestions);
	});
}

function displayMessages(messageList: MessageList, continuation: Continuation | null) {
	if (messageList.length > 0) {
		messageLog.appendChild(liConstructor(messageList[0].text, ['me', 'new'], null));
		messageList.shift(); // remove first item from message list
		setTimeout(() => {
			displayMessages(messageList, continuation);
		}, delay);
	}
	else if (continuation) {
		continuation();
	}
}

function displayResponse(response: string) {
	messageLog.appendChild(liConstructor(response, ['you', 'new'], null));
}

function displaySuggestions(suggestionList: SuggestionList) {
	removeChildren(currentSuggestions);

	suggestionList.forEach((suggestion) => {
		const cont = ((suggestion) => {
			if (suggestion.next) {
				return (e) => {
					displayResponse(suggestion.text);
					removeChildren(currentSuggestions);
					setTimeout(() => {
						displayMessages(suggestion.next.messages, () => {
							displaySuggestions(suggestion.next.suggestions);
						});
					}, delay);
				};
			} else {
				return (e) => {
					displayResponse(suggestion.text);
					removeChildren(currentSuggestions);
				};
			}
		})(suggestion);
		let li = liConstructor(suggestion.text, ['new'], cont);
		currentSuggestions.appendChild(li);
	});
}

function liConstructor(text: string, classes: string[] | null, listener: Listener | null): HTMLElement {
	let li = document.createElement('li');

	let div = document.createElement('div');

	let p = document.createElement('p');
	p.innerHTML = text;
	p.classList.add('message');

	li.appendChild(p);

	if (classes && classes.length > 0) {
		classes.forEach((c) => {li.classList.add(c);});
	}
	if (typeof listener === "function" && listener != null) {
		li.addEventListener('click', listener);
	}
	return li;
}

function removeChildren(elem: HTMLElement): void {
	while (elem.children.length > 0) {
		elem.children[0].remove();
	}
}
