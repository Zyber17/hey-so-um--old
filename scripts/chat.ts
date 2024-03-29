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


const nameMessage: MessageItem = ((hash) => {
	if (hash.toLowerCase() == 'z') {
		return {
			text: "It's Z",
			timing: null
		};
	} else {
		return {
			text: "It's <span id='z'>Z</span><span id='ack'>ack</span><span id='ary'>ary</span>",
			timing: 8500
		};
	}
})(window.location.hash.substr(1));

let postLanguage: MessageAndSuggestionItem = { // WIP
	messages: [
		{
			text: "Any questions?",
			timing: null
		}
	],
	suggestions: [
		{
			text: "Nah",
			next: null
		}
	]
};

let spanish: MessageAndSuggestionItem = {
	messages: [{
		text: "&iquest;Habla usted espa&ntilde;ol?",
		timing: null
	}],
	suggestions: [
		{
			text: "&iexcl;S&iacute;!",
			next: {
				messages: [
					{
						text: "Preferir&iacute;a que usara la gram&aacute;tica femenina cuando hable sobre m&iacute;.",
						timing: null
					},
					{
						text: "Por ejemplo, diga &laquo;Z es programadora&raquo; y &laquo;&iquest;Est&aacute; lista?&raquo;, no &laquo;Z es programador&raquo; ni &laquo;&iquest;Est&aacute; listo?&raquo;.",
						timing: null
					}
				],
				suggestions: [
					{
						text: "S&iacute;, por supuesto",
						next:  (() => {
							postLanguage.messages.unshift({
								text: "&iexcl;Muchas gracias!",
								timing: null
							});
							return postLanguage;
						})()
					}
				]
			}
		}, {
			text: "No",
			next: null
		}, {
			text: "Huh?",
			next: {
				messages: [{
					text: "Oh, I was just asking if you speak Spanish. If you don&rsquo;t, don&rsquo;t worry about it.",
					timing: null
				}],
				suggestions: [{
					text: "Ah, okay.",
					next: null
				}]
			}
		}
	]
};

const french: MessageAndSuggestionItem = {
	messages: [
		{
			text: "Great! Thanks so much!",
			timing: null
		}, {
			text: "Parlez-vous fran&ccedil;ais ?",
			timing: null
		}
	],
	suggestions: [
		{
			text: "Oui&nbsp;!",
			next: {
				messages: [
					{
						text: "Je l&rsquo;aimerais si vous pouvez utilizer du grammaire f&eacute;minin quand vous parlez de moi.",
						timing: null
					}, {
						text: "Par exemple, dire &laquo;&nbsp;Z est informaticienne&nbsp;&raquo; et &laquo;&nbsp;Est-vous pr&ecirc;te&nbsp;?&nbsp;&raquo;, pas &laquo;&nbsp;Z est informaticien&nbsp;&raquo; ni &laquo; Est-vous pr&ecirc;t&nbsp;?&nbsp;&raquo;.",
						timing: null
					}
				],
				suggestions: [{
					text: "D&rsquo;accord, bien s&ucirc;r.",
					next: (() => {
						spanish.messages.unshift({
							text: "Merci beaucoup&nbsp;!",
							timing: null
						});
						return spanish;
					})()
				}]
			}
		}, {
			text: "Non (no)",
			next: spanish
		}, {
			text: "Huh?",
			next: {
				messages: [{
					text: "Oh, I was just asking if you speak French. If you don&rsquo;t, don&rsquo;t worry about it.",
					timing: null
				}],
				suggestions: [{
					text: "Ah, okay.",
					next: spanish
				}]
			}
		}
	]
};

const nameAndPronouns: MessageAndSuggestionItem = {
	messages: [
		{
			text: "Well, these days I go by the name &lsquo;Z&rsquo; (pronounced the American way: <em>Zee</em> &mdash; not the Canaidan/British way: <em>Zed</em>). My pronouns are <a href='https://pronoun.is/they/.../themself'>they/them/themself</a>. Here are some example usages:",
			timing: 2000
		}, {
			text: "Z themself went to the store today to buy their favoite tea.<br/><br/>They like to go running in cool (but not cold) weather.<br/><br/>Z? Oh yeah, I like them a lot.",
			timing: null
		}
	],
	suggestions: [
		{
			text: "Okay, got it.",
			next: french
		}
	]
};

const messageFlow: MessageAndSuggestionList = [
	{
		messages: [
			{
				text: "Hey",
				timing: null
			},
			nameMessage, {
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
							text: "Uh, well, turns out, I'm genderqueer.",
							timing: null
						}
					],
					suggestions: [
						{
							text: "Huh? What's that?",
							next: {
								messages: [
									{
										text: "I'm sure you&rsquo;d get a different answer from every genderqueer person you asked, but to me it&rsquo;s simply that I <em>really</em> dislike being confined to the typical roles/conceptions/ideals of one gender or another (especially masculinity), to the point that it presents <a href='https://en.wikipedia.org/wiki/Gender_dysphoria'>real mental health issues</a>, for me when I don't take steps (like this) to remedy them.",
										timing: null
									}, {
										text: "That&rsquo;s why I go by a different name and different pronouns these days.",
										timing: null
									}
								],
								suggestions: [
									{
										text: "Okay! What name and pronouns should I use for you?",
										next: nameAndPronouns
									}
								]
							}
						}, {
							text: "Okay! What name and pronouns should I use for you?",
							next: nameAndPronouns
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


const delay = 800; //800
var messages: HTMLElement;
var messageLog: HTMLElement;
var currentSuggestions: HTMLElement;

function chatInit(): void {
	messages = document.getElementById('messages');
	messageLog = document.getElementById('messageLog');
	currentSuggestions = document.getElementById('currentSuggestions');
	displayMessages(messageFlow[0].messages, () => {
		displaySuggestions(messageFlow[0].suggestions);
	});
}

function displayMessages(messageList: MessageList, continuation: Continuation | null) {
	if (messageList && messageList.length > 0) {
		const li = liConstructor(messageList[0].text, ['me', 'new'], null);
		messageLog.appendChild(li);
		scrollDown();

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
	const li = liConstructor(response, ['you', 'new'], null);
	messageLog.appendChild(li);
	scrollDown();
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

function scrollDown() {
	//li.scrollIntoView({behavior: "smooth", block: "end"}); if bowser suppoer was better…

	const acc = 25; // acceleration constant, how much faster should the scolling happen compared to the fade
	const scollIncrement = acc*(messages.scrollHeight - messages.scrollTop - messages.clientHeight)/(delay);

	function scrollHelper(trueVal: number) {
		if(messages.scrollTop < (messages.scrollHeight - messages.clientHeight)) {
			trueVal += scollIncrement;
			messages.scrollTop = Math.ceil(trueVal);
			console.log(messages.scrollTop);
			setTimeout(() => { scrollHelper(trueVal); }, 1);
		}
	}
	scrollHelper(messages.scrollTop);
}
