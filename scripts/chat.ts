interface MessageItem {
	text: string;
	timing: number | null;
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
		messages: [
			{
				text: "Hey",
				timing: null
			}, {
				text: "It's <span id='z'>Z</span><span id='ack'>ack</span><span id='ary'>ary</span>",
				timing: 8500
			}, {
				text: "So, um, I need to talk to you about a thing.",
				timing: null
			}
		],
		suggestions: [
			{
				text: "Okay&hellip;",
				next: {
					messages: [
						{
							text: "So, turns out, I'm genderqueer.",
							timing: null
						}
					],
					suggestions: [
						{
							text: "Huh? What's that?",
							next: {
								messages: [
									{
										text: "A thing",
										timing: null
									}
								],
								suggestions: null
							}
						}, {
							text: "Okay! What name and pronouns should I use for you?",
							next: {
								messages: [
									{
										text: "Z and They/them",
										timing: null
									}
								],
								suggestions: null
							}
						}, {
							text: "Ugh, same",
							next: {
								messages: [
									{
										text: "Hi! I'm Z! (they/them)",
										timing: null
									}, {
										text: "I hope you like this little thing I made to help make coming out easier. I got the initial idea from the lovely <a href='https://github.com/lknutilla/hey-so-um'>Lo Knutilla</a>.",
										timing: null
									}, {
										text: "I'f you think something like this would help you come out too, feel free to take inspiration or even <a href='https://github.com/Zyber17/hey-so-um'>fork this site on GitHub</a>.",
										timing: null
									}, {
										text: "If you'd like to say hi, I'm <a href='https://twitter.com/Z_Healy'>@Z_Healy</a> on Twitter and one of my many emails is <a href='mailto:z@zcorbett.com'>z@zcorbett.com</a>.",
										timing: null
									}
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

const delay = 800;
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
		messageLog.appendChild(liConstructor(messageList[0].text, ['me', 'new'], null));
		const timing: number = messageList[0].timing ? messageList[0].timing : delay;
		messageList.shift(); // remove first item from message list
		setTimeout(() => {
			displayMessages(messageList, continuation);
		}, timing);
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
