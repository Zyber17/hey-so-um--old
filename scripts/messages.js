"use strict";
exports.nameMessage = (function (hash) {
    if (hash.toLowerCase() == 'z') {
        return {
            text: "It's Z",
            timing: null
        };
    }
    else {
        return {
            text: "It's <span id='z'>Z</span><span id='ack'>ack</span><span id='ary'>ary</span>",
            timing: 8500
        };
    }
})(window.location.hash.substr(1));
exports.spanish = {
    messages: [{
            text: "&iquest;Habla usted espa&ntilde;ol?",
            timing: null
        }],
    suggestions: [
        {
            text: "&iexcl;S&iacute;!",
            next: null
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
exports.french = {
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
                        text: "Par exemple, dire &laquo;&nbsp;Z est informaticienne&nbsp;&raquo; et &laquo;&nbsp;Est-vous pr&ecirc;te&nbsp;?&nbsp;&raquo;, pas &laquo;&nbsp;Z est informaticien&nbsp;&raquo; ou &laquo; Est-vous pr&ecirc;t&nbsp;?&nbsp;&raquo;.",
                        timing: null
                    }
                ],
                suggestions: [{
                        text: "D&rsquo;accord, bien s&ucirc;r.",
                        next: (function () {
                            exports.spanish.messages.unshift({
                                text: "Merci beaucoup&nbsp;!",
                                timing: null
                            });
                            return exports.spanish;
                        })()
                    }]
            }
        }, {
            text: "Non (no)",
            next: exports.spanish
        }, {
            text: "Huh?",
            next: {
                messages: [{
                        text: "Oh, I was just asking if you speak French. If you don&rsquo;t, don&rsquo;t worry about it.",
                        timing: null
                    }],
                suggestions: [{
                        text: "Ah, okay.",
                        next: exports.spanish
                    }]
            }
        }
    ]
};
exports.nameAndPronouns = {
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
            next: exports.french
        }
    ]
};
exports.messageFlow = [
    {
        messages: [
            {
                text: "Hey",
                timing: null
            },
            exports.nameMessage, {
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
                                        next: exports.nameAndPronouns
                                    }
                                ]
                            }
                        }, {
                            text: "Okay! What name and pronouns should I use for you?",
                            next: exports.nameAndPronouns
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
