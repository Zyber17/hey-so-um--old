// interface MessageItem {
// 	text: string;
// 	//style: StyleFunction | null;
// }
type MessageList    = string[];

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
		messages: [
			"Hey",
			"So, um, I need to talk to you about a thing."
		],
		suggestions: [
			{
				text: "Okay&hellip;",
				next: {
					messages: [
						"So, turns out, I'm genderqueer."
					],
					suggestions: [
						{
							text: "Huh? What's that?",
							next: {
								messages: ["A thing"],
								suggestions: null
							}
						}, {
							text: "Okay! What name and pronouns should I use for you?",
							next: {
								messages: [
									"Z and They/them"
								],
								suggestions: null
							}
						}, {
							text: "Ugh, same",
							next: {
								messages: [
									"Hi! I'm Z! (they/them)",
									"I hope you like this little thing I made to help make coming out easier. I got the initial idea from the lovely [Lo Knutilla](https://github.com/lknutilla/hey-so-um).",
									"I'f you think something like this would help you come out too, feel free to take inspiration or even [fork this site on GitHub](https://github.com/Zyber17/hey-so-um).",
									"If you'd like to say hi, I'm [@Z_Healy](twitter.com/Z_Healy) on Twitter and one of my many emails is [z@corbett.im](mailto:z@corbett.im)"
								],
								suggestions: null
							}
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
	if (messageList && messageList.length > 0) {
		messageLog.appendChild(liConstructor(messageList[0], ['me', 'new'], null));
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

	if(suggestionList && suggestionList.length > 0) {
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
