export default {
	"blackstone-beach-fair-82": {
		id: "blackstone-beach-fair-82",
		hidden: false,
		active: true,

		titleKey: { zh: "黑石海滩游园会", en: "Blackstone Beach Garden Fair" },
		subtitleKey: { zh: "来自第 82 届心界大会", en: "From the 82nd Heart World Conference" },
		descriptionKey: {
			zh: "心界世界观专题游园，沿黑石海滩自由阅读。",
			en: "A Heart World themed garden fair along Blackstone Beach."
		},

		period: { start: "2025-09", end: "2026-03" },

		theme: {
			id: "blackstone-beach",
			backgroundUrl: "/img/celebrations/blackstone-beach-fair-82/blackstone-beach.webp"
		},

		characters: {
			luobei: {
				nameKey: { zh: "萝北", en: "Luobei" },
				roleKey: { zh: "参展者", en: "Exhibitor" }
				// portrait: require("@/assets/celebrations/bb82/luobei.webp")
				// link: "https://example.com/luobei"
			},
			robert: {
				nameKey: { zh: "罗伯特", en: "Robert" },
				roleKey: { zh: "银月寺保安队长", en: "Silver Moon Head Guard" }
				// portrait: require("@/assets/celebrations/bb82/robert.webp")
			}
		},

		body: [
			{
				type: "prose",
				textKey: {
					zh: "## 入园\n\n欢迎来到黑石海滩。第 82 届心界大会开始了，灯串挂在黑石上方，海风把彩旗吹得猎猎响。",
					en: "## Entrance\n\nWelcome to Blackstone Beach. The 82nd Heart World Conference has begun—lights strung above black stone, sea breeze rattling the bunting."
				}
			},
			{
				type: "portrait",
				character: "luobei",
				align: "left"
			},
			{
				type: "prose",
				textKey: {
					zh: "我先带你看心界展区。罗伯特在那边执勤，他会跟你打招呼。",
					en: "Let me show you the Heart World booth first. Robert is on duty there—he will greet you."
				}
			},
			{
				type: "portrait",
				character: "robert",
				align: "right"
			},
			{
				type: "project",
				slug: "heart-world",
				align: "left",
				introKey: {
					zh: "这是心界系列的入口。本届我想把它放在路线最前面——从这里可以进入银月寺、书界，以及之后所有 Heart World 作品的语境。",
					en: "This is the gateway to the Heart World series. For this conference I put it first—from here you enter Silver Moon, the Book Realm, and the context for all later Heart World works."
				}
			},
			{
				type: "prose",
				textKey: {
					zh: "继续往海滩深处走，还有几部作品散落在路边。",
					en: "Walk deeper along the beach—more works are scattered along the path."
				}
			},
			{
				type: "project",
				slug: "beyond-books-silver-moon",
				align: "right",
				introKey: {
					zh: "银月寺是书界线里我最常回去的地方之一。",
					en: "Silver Moon Temple is one of the Book Realm locations I return to most often."
				}
			},
			{
				type: "project",
				slug: "heart-world-jin-captain",
				align: "left"
			},
			{
				type: "prose",
				textKey: {
					zh: "## 散场\n\n感谢游园。海风会带走今天的声音，但黑石海滩还在，下次心界大会再见。",
					en: "## Closing\n\nThanks for visiting. The sea breeze will carry today's voices away, but Blackstone Beach remains—see you at the next Heart World Conference."
				}
			}
		]
	}
}
