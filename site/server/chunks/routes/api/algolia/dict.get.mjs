import { d as defineEventHandler, u as useMeilisearch } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'meilisearch';
import 'node:url';
import 'ipx';

var cod = [
	"call of duty",
	"call",
	"bo6",
	"bo7",
	"bo",
	"black ops",
	"black"
];
var call = [
	"cod",
	"call of duty",
	"bo6",
	"bo7",
	"bo",
	"black ops",
	"black"
];
var bo6 = [
	"cod",
	"call of duty",
	"call",
	"bo7",
	"bo",
	"black ops",
	"black"
];
var bo7 = [
	"cod",
	"call of duty",
	"call",
	"bo6",
	"bo",
	"black ops",
	"black"
];
var bo = [
	"cod",
	"call of duty",
	"call",
	"bo6",
	"bo7",
	"black ops",
	"black"
];
var black = [
	"cod",
	"call of duty",
	"call",
	"bo6",
	"bo7",
	"bo",
	"black ops"
];
var re8 = [
	"resident evil village",
	"resident evil 8"
];
var ac = [
	"assassin's cress",
	"assassin's creed",
	"shadows",
	"unity",
	"ezio collection",
	"ubisoft",
	"iii",
	"assassin",
	"asisan",
	"assasin",
	"creed"
];
var shadows = [
	"assassin's cress",
	"assassin's creed",
	"ac",
	"unity",
	"ezio collection",
	"ubisoft",
	"iii",
	"assassin",
	"asisan",
	"assasin",
	"creed"
];
var unity = [
	"assassin's cress",
	"assassin's creed",
	"ac",
	"shadows",
	"ezio collection",
	"ubisoft",
	"iii",
	"assassin",
	"asisan",
	"assasin",
	"creed"
];
var ubisoft = [
	"assassin's cress",
	"assassin's creed",
	"ac",
	"shadows",
	"unity",
	"ezio collection",
	"iii",
	"assassin",
	"asisan",
	"assasin",
	"creed"
];
var iii = [
	"assassin's cress",
	"assassin's creed",
	"ac",
	"shadows",
	"unity",
	"ezio collection",
	"ubisoft",
	"assassin",
	"asisan",
	"assasin",
	"creed"
];
var assassin = [
	"assassin's cress",
	"assassin's creed",
	"ac",
	"shadows",
	"unity",
	"ezio collection",
	"ubisoft",
	"iii",
	"asisan",
	"assasin",
	"creed"
];
var asisan = [
	"assassin's cress",
	"assassin's creed",
	"ac",
	"shadows",
	"unity",
	"ezio collection",
	"ubisoft",
	"iii",
	"assassin",
	"assasin",
	"creed"
];
var assasin = [
	"assassin's cress",
	"assassin's creed",
	"ac",
	"shadows",
	"unity",
	"ezio collection",
	"ubisoft",
	"iii",
	"assassin",
	"asisan",
	"creed"
];
var creed = [
	"assassin's cress",
	"assassin's creed",
	"ac",
	"shadows",
	"unity",
	"ezio collection",
	"ubisoft",
	"iii",
	"assassin",
	"asisan",
	"assasin"
];
var bloodborn = [
	"بلودبورن",
	"ps4 bloodborn",
	"blood",
	"born",
	"bloodborne"
];
var blood = [
	"bloodborn",
	"بلودبورن",
	"ps4 bloodborn",
	"born",
	"bloodborne"
];
var born = [
	"bloodborn",
	"بلودبورن",
	"ps4 bloodborn",
	"blood",
	"bloodborne"
];
var bloodborne = [
	"bloodborn",
	"بلودبورن",
	"ps4 bloodborn",
	"blood",
	"born"
];
var manita = [
	"manet ps5",
	"manette ps4",
	"manette ps5",
	"dualsense",
	"dualshock",
	"edge",
	"high copie",
	"manet ps4",
	"manette dualsense rose"
];
var dualsense = [
	"manet ps5",
	"manita",
	"manette ps4",
	"manette ps5",
	"dualshock",
	"edge",
	"high copie",
	"manet ps4",
	"manette dualsense rose"
];
var dualshock = [
	"manet ps5",
	"manita",
	"manette ps4",
	"manette ps5",
	"dualsense",
	"edge",
	"high copie",
	"manet ps4",
	"manette dualsense rose"
];
var edge = [
	"manet ps5",
	"manita",
	"manette ps4",
	"manette ps5",
	"dualsense",
	"dualshock",
	"high copie",
	"manet ps4",
	"manette dualsense rose"
];
var dvd = [
	"dvd 📀",
	"bluray",
	"game",
	"cd ps4",
	"cd ps5",
	"cd xbox",
	"سیدیات بلایستیشن 4"
];
var bluray = [
	"dvd 📀",
	"dvd",
	"game",
	"cd ps4",
	"cd ps5",
	"cd xbox",
	"سیدیات بلایستیشن 4"
];
var game = [
	"dvd 📀",
	"dvd",
	"bluray",
	"cd ps4",
	"cd ps5",
	"cd xbox",
	"سیدیات بلایستیشن 4"
];
var last = [
	"the last of us",
	"the last of us ps5 neuf",
	"last of us",
	"last of as",
	"last af as",
	"the",
	"us",
	"last of us ps4",
	"last of us ps5",
	"the last of us ps4 occasion"
];
var the = [
	"the last of us",
	"the last of us ps5 neuf",
	"last of us",
	"last of as",
	"last af as",
	"last",
	"us",
	"last of us ps4",
	"last of us ps5",
	"the last of us ps4 occasion"
];
var us = [
	"the last of us",
	"the last of us ps5 neuf",
	"last of us",
	"last of as",
	"last af as",
	"last",
	"the",
	"last of us ps4",
	"last of us ps5",
	"the last of us ps4 occasion"
];
var xbox = [
	"xbox series s",
	"xbx",
	"xbox series x",
	"xbox one x"
];
var xbx = [
	"xbox series s",
	"xbox",
	"xbox series x",
	"xbox one x"
];
var occasion = [
	"مستعمل",
	"مستخدم",
	"اوكازيون",
	"occazion",
	"ocazion"
];
var occazion = [
	"occasion",
	"مستعمل",
	"مستخدم",
	"اوكازيون",
	"ocazion"
];
var ocazion = [
	"occasion",
	"مستعمل",
	"مستخدم",
	"اوكازيون",
	"occazion"
];
var re9 = [
	"resident evil requiem",
	"resident evil 9",
	"resident evil",
	"risdont evl 9",
	"re 9",
	"resident requin",
	"resident evil requiem delux",
	"resident evil hd",
	"ریزدیدنت ایفل 9"
];
var kena = [
	"kena ps5",
	"kena ps4",
	"kena bridge"
];
var darksiuls = [
	"dark souls",
	"souls",
	"soul",
	"dark"
];
var souls = [
	"darksiuls",
	"dark souls",
	"soul",
	"dark"
];
var soul = [
	"darksiuls",
	"dark souls",
	"souls",
	"dark"
];
var dark = [
	"darksiuls",
	"dark souls",
	"souls",
	"soul"
];
var heat = [
	"nfs heat",
	"need for speed",
	"nfs"
];
var nfs = [
	"nfs heat",
	"need for speed",
	"heat"
];
var ps4 = [
	"playstation 4",
	"console 4",
	"sony 4",
	"بلاي 4",
	"play 4",
	"sony playstation 4",
	"play 4 slim",
	"play 4 fat",
	"ps4 fat",
	"ps4 pro",
	"ps4 slim",
	"ps4 slim version 9.00",
	"ps4 slim flash"
];
var forza = [
	"forza horizon",
	"forza 5",
	"فوزا هریزه",
	"فورزا",
	"foza",
	"fora 5",
	"fonza 4",
	"forza horizon 4"
];
var foza = [
	"forza",
	"forza horizon",
	"forza 5",
	"فوزا هریزه",
	"فورزا",
	"fora 5",
	"fonza 4",
	"forza horizon 4"
];
var ps5 = [
	"ps5 slim",
	"ps5 fat",
	"ps5 pro",
	"بيس فايف",
	"بالي سانك",
	"بلاي فايف",
	"بلاي 5",
	"بلاي",
	"playstation 5",
	"ps",
	"ps5 console",
	"console",
	"next gen",
	"sony playstation 5"
];
var ps = [
	"ps5",
	"ps5 slim",
	"ps5 fat",
	"ps5 pro",
	"بيس فايف",
	"بالي سانك",
	"بلاي فايف",
	"بلاي 5",
	"بلاي",
	"playstation 5",
	"ps5 console",
	"console",
	"next gen",
	"sony playstation 5"
];
var console = [
	"ps5",
	"ps5 slim",
	"ps5 fat",
	"ps5 pro",
	"بيس فايف",
	"بالي سانك",
	"بلاي فايف",
	"بلاي 5",
	"بلاي",
	"playstation 5",
	"ps",
	"ps5 console",
	"next gen",
	"sony playstation 5"
];
var shirt = [
	"t-shirt",
	"shir",
	"tshirt",
	"triko",
	"تريكو",
	"sweet shirt",
	"trikowat",
	"hoddie",
	"sweet",
	"labsa"
];
var shir = [
	"t-shirt",
	"shirt",
	"tshirt",
	"triko",
	"تريكو",
	"sweet shirt",
	"trikowat",
	"hoddie",
	"sweet",
	"labsa"
];
var tshirt = [
	"t-shirt",
	"shirt",
	"shir",
	"triko",
	"تريكو",
	"sweet shirt",
	"trikowat",
	"hoddie",
	"sweet",
	"labsa"
];
var triko = [
	"t-shirt",
	"shirt",
	"shir",
	"tshirt",
	"تريكو",
	"sweet shirt",
	"trikowat",
	"hoddie",
	"sweet",
	"labsa"
];
var trikowat = [
	"t-shirt",
	"shirt",
	"shir",
	"tshirt",
	"triko",
	"تريكو",
	"sweet shirt",
	"hoddie",
	"sweet",
	"labsa"
];
var hoddie = [
	"t-shirt",
	"shirt",
	"shir",
	"tshirt",
	"triko",
	"تريكو",
	"sweet shirt",
	"trikowat",
	"sweet",
	"labsa"
];
var sweet = [
	"t-shirt",
	"shirt",
	"shir",
	"tshirt",
	"triko",
	"تريكو",
	"sweet shirt",
	"trikowat",
	"hoddie",
	"labsa"
];
var labsa = [
	"t-shirt",
	"shirt",
	"shir",
	"tshirt",
	"triko",
	"تريكو",
	"sweet shirt",
	"trikowat",
	"hoddie",
	"sweet"
];
var rdd = [
	"read dead redemption",
	"rdr",
	"rdr 2",
	"red dead redemption",
	"rdd 2",
	"ريدمبشن",
	"ريد ديد ريدمبشن",
	"red ded",
	"رداد",
	"rid diiiii ronamrtion 2",
	"rodad",
	"ردد2 اکس بوکس وان"
];
var rdr = [
	"read dead redemption",
	"rdd",
	"rdr 2",
	"red dead redemption",
	"rdd 2",
	"ريدمبشن",
	"ريد ديد ريدمبشن",
	"red ded",
	"رداد",
	"rid diiiii ronamrtion 2",
	"rodad",
	"ردد2 اکس بوکس وان"
];
var rodad = [
	"read dead redemption",
	"rdd",
	"rdr",
	"rdr 2",
	"red dead redemption",
	"rdd 2",
	"ريدمبشن",
	"ريد ديد ريدمبشن",
	"red ded",
	"رداد",
	"rid diiiii ronamrtion 2",
	"ردد2 اکس بوکس وان"
];
var fifa = [
	"fc",
	"lamal",
	"halland",
	"f c",
	"balon",
	"foot",
	"فيفا",
	"فيف",
	"fc 26",
	"f 26",
	"fofa 26",
	"fila",
	"fina",
	"fofla"
];
var fc = [
	"fifa",
	"lamal",
	"halland",
	"f c",
	"balon",
	"foot",
	"فيفا",
	"فيف",
	"fc 26",
	"f 26",
	"fofa 26",
	"fila",
	"fina",
	"fofla"
];
var lamal = [
	"fifa",
	"fc",
	"halland",
	"f c",
	"balon",
	"foot",
	"فيفا",
	"فيف",
	"fc 26",
	"f 26",
	"fofa 26",
	"fila",
	"fina",
	"fofla"
];
var halland = [
	"fifa",
	"fc",
	"lamal",
	"f c",
	"balon",
	"foot",
	"فيفا",
	"فيف",
	"fc 26",
	"f 26",
	"fofa 26",
	"fila",
	"fina",
	"fofla"
];
var balon = [
	"fifa",
	"fc",
	"lamal",
	"halland",
	"f c",
	"foot",
	"فيفا",
	"فيف",
	"fc 26",
	"f 26",
	"fofa 26",
	"fila",
	"fina",
	"fofla"
];
var foot = [
	"fifa",
	"fc",
	"lamal",
	"halland",
	"f c",
	"balon",
	"فيفا",
	"فيف",
	"fc 26",
	"f 26",
	"fofa 26",
	"fila",
	"fina",
	"fofla"
];
var fila = [
	"fifa",
	"fc",
	"lamal",
	"halland",
	"f c",
	"balon",
	"foot",
	"فيفا",
	"فيف",
	"fc 26",
	"f 26",
	"fofa 26",
	"fina",
	"fofla"
];
var fina = [
	"fifa",
	"fc",
	"lamal",
	"halland",
	"f c",
	"balon",
	"foot",
	"فيفا",
	"فيف",
	"fc 26",
	"f 26",
	"fofa 26",
	"fila",
	"fofla"
];
var fofla = [
	"fifa",
	"fc",
	"lamal",
	"halland",
	"f c",
	"balon",
	"foot",
	"فيفا",
	"فيف",
	"fc 26",
	"f 26",
	"fofa 26",
	"fila",
	"fina"
];
var gta = [
	"g t a",
	"san andreas",
	"vice city",
	"جي تي ايه",
	"hta",
	"جتيا",
	"جيتيا",
	"gta v",
	"gta san",
	"kahloch",
	"gta ps4",
	"gta ps5",
	"gt 5",
	"grand theft auto"
];
var hta = [
	"gta",
	"g t a",
	"san andreas",
	"vice city",
	"جي تي ايه",
	"جتيا",
	"جيتيا",
	"gta v",
	"gta san",
	"kahloch",
	"gta ps4",
	"gta ps5",
	"gt 5",
	"grand theft auto"
];
var kahloch = [
	"gta",
	"g t a",
	"san andreas",
	"vice city",
	"جي تي ايه",
	"hta",
	"جتيا",
	"جيتيا",
	"gta v",
	"gta san",
	"gta ps4",
	"gta ps5",
	"gt 5",
	"grand theft auto"
];
const synon = {
	cod: cod,
	"call of duty": [
	"cod",
	"call",
	"bo6",
	"bo7",
	"bo",
	"black ops",
	"black"
],
	call: call,
	bo6: bo6,
	bo7: bo7,
	bo: bo,
	"black ops": [
	"cod",
	"call of duty",
	"call",
	"bo6",
	"bo7",
	"bo",
	"black"
],
	black: black,
	"pokémon legends: z-a": [
	"pokimon az",
	"pokman z"
],
	"pokimon az": [
	"pokémon legends: z-a",
	"pokman z"
],
	"pokman z": [
	"pokémon legends: z-a",
	"pokimon az"
],
	"resident evil village": [
	"resident evil 8",
	"re8"
],
	"resident evil 8": [
	"resident evil village",
	"re8"
],
	re8: re8,
	"assassin's cress": [
	"assassin's creed",
	"ac",
	"shadows",
	"unity",
	"ezio collection",
	"ubisoft",
	"iii",
	"assassin",
	"asisan",
	"assasin",
	"creed"
],
	"assassin's creed": [
	"assassin's cress",
	"ac",
	"shadows",
	"unity",
	"ezio collection",
	"ubisoft",
	"iii",
	"assassin",
	"asisan",
	"assasin",
	"creed"
],
	ac: ac,
	shadows: shadows,
	unity: unity,
	"ezio collection": [
	"assassin's cress",
	"assassin's creed",
	"ac",
	"shadows",
	"unity",
	"ubisoft",
	"iii",
	"assassin",
	"asisan",
	"assasin",
	"creed"
],
	ubisoft: ubisoft,
	iii: iii,
	assassin: assassin,
	asisan: asisan,
	assasin: assasin,
	creed: creed,
	bloodborn: bloodborn,
	"بلودبورن": [
	"bloodborn",
	"ps4 bloodborn",
	"blood",
	"born",
	"bloodborne"
],
	"ps4 bloodborn": [
	"bloodborn",
	"بلودبورن",
	"blood",
	"born",
	"bloodborne"
],
	blood: blood,
	born: born,
	bloodborne: bloodborne,
	"manet ps5": [
	"manita",
	"manette ps4",
	"manette ps5",
	"dualsense",
	"dualshock",
	"edge",
	"high copie",
	"manet ps4",
	"manette dualsense rose"
],
	manita: manita,
	"manette ps4": [
	"manet ps5",
	"manita",
	"manette ps5",
	"dualsense",
	"dualshock",
	"edge",
	"high copie",
	"manet ps4",
	"manette dualsense rose"
],
	"manette ps5": [
	"manet ps5",
	"manita",
	"manette ps4",
	"dualsense",
	"dualshock",
	"edge",
	"high copie",
	"manet ps4",
	"manette dualsense rose"
],
	dualsense: dualsense,
	dualshock: dualshock,
	edge: edge,
	"high copie": [
	"manet ps5",
	"manita",
	"manette ps4",
	"manette ps5",
	"dualsense",
	"dualshock",
	"edge",
	"manet ps4",
	"manette dualsense rose"
],
	"manet ps4": [
	"manet ps5",
	"manita",
	"manette ps4",
	"manette ps5",
	"dualsense",
	"dualshock",
	"edge",
	"high copie",
	"manette dualsense rose"
],
	"manette dualsense rose": [
	"manet ps5",
	"manita",
	"manette ps4",
	"manette ps5",
	"dualsense",
	"dualshock",
	"edge",
	"high copie",
	"manet ps4"
],
	"dvd 📀": [
	"dvd",
	"bluray",
	"game",
	"cd ps4",
	"cd ps5",
	"cd xbox",
	"سیدیات بلایستیشن 4"
],
	dvd: dvd,
	bluray: bluray,
	game: game,
	"cd ps4": [
	"dvd 📀",
	"dvd",
	"bluray",
	"game",
	"cd ps5",
	"cd xbox",
	"سیدیات بلایستیشن 4"
],
	"cd ps5": [
	"dvd 📀",
	"dvd",
	"bluray",
	"game",
	"cd ps4",
	"cd xbox",
	"سیدیات بلایستیشن 4"
],
	"cd xbox": [
	"dvd 📀",
	"dvd",
	"bluray",
	"game",
	"cd ps4",
	"cd ps5",
	"سیدیات بلایستیشن 4"
],
	"سیدیات بلایستیشن 4": [
	"dvd 📀",
	"dvd",
	"bluray",
	"game",
	"cd ps4",
	"cd ps5",
	"cd xbox"
],
	"the last of us": [
	"the last of us ps5 neuf",
	"last of us",
	"last of as",
	"last af as",
	"last",
	"the",
	"us",
	"last of us ps4",
	"last of us ps5",
	"the last of us ps4 occasion"
],
	"the last of us ps5 neuf": [
	"the last of us",
	"last of us",
	"last of as",
	"last af as",
	"last",
	"the",
	"us",
	"last of us ps4",
	"last of us ps5",
	"the last of us ps4 occasion"
],
	"last of us": [
	"the last of us",
	"the last of us ps5 neuf",
	"last of as",
	"last af as",
	"last",
	"the",
	"us",
	"last of us ps4",
	"last of us ps5",
	"the last of us ps4 occasion"
],
	"last of as": [
	"the last of us",
	"the last of us ps5 neuf",
	"last of us",
	"last af as",
	"last",
	"the",
	"us",
	"last of us ps4",
	"last of us ps5",
	"the last of us ps4 occasion"
],
	"last af as": [
	"the last of us",
	"the last of us ps5 neuf",
	"last of us",
	"last of as",
	"last",
	"the",
	"us",
	"last of us ps4",
	"last of us ps5",
	"the last of us ps4 occasion"
],
	last: last,
	the: the,
	us: us,
	"last of us ps4": [
	"the last of us",
	"the last of us ps5 neuf",
	"last of us",
	"last of as",
	"last af as",
	"last",
	"the",
	"us",
	"last of us ps5",
	"the last of us ps4 occasion"
],
	"last of us ps5": [
	"the last of us",
	"the last of us ps5 neuf",
	"last of us",
	"last of as",
	"last af as",
	"last",
	"the",
	"us",
	"last of us ps4",
	"the last of us ps4 occasion"
],
	"the last of us ps4 occasion": [
	"the last of us",
	"the last of us ps5 neuf",
	"last of us",
	"last of as",
	"last af as",
	"last",
	"the",
	"us",
	"last of us ps4",
	"last of us ps5"
],
	"xbox series s": [
	"xbox",
	"xbx",
	"xbox series x",
	"xbox one x"
],
	xbox: xbox,
	xbx: xbx,
	"xbox series x": [
	"xbox series s",
	"xbox",
	"xbx",
	"xbox one x"
],
	"xbox one x": [
	"xbox series s",
	"xbox",
	"xbx",
	"xbox series x"
],
	occasion: occasion,
	"مستعمل": [
	"occasion",
	"مستخدم",
	"اوكازيون",
	"occazion",
	"ocazion"
],
	"مستخدم": [
	"occasion",
	"مستعمل",
	"اوكازيون",
	"occazion",
	"ocazion"
],
	"اوكازيون": [
	"occasion",
	"مستعمل",
	"مستخدم",
	"occazion",
	"ocazion"
],
	occazion: occazion,
	ocazion: ocazion,
	"resident evil requiem": [
	"resident evil 9",
	"re9",
	"resident evil",
	"risdont evl 9",
	"re 9",
	"resident requin",
	"resident evil requiem delux",
	"resident evil hd",
	"ریزدیدنت ایفل 9"
],
	"resident evil 9": [
	"resident evil requiem",
	"re9",
	"resident evil",
	"risdont evl 9",
	"re 9",
	"resident requin",
	"resident evil requiem delux",
	"resident evil hd",
	"ریزدیدنت ایفل 9"
],
	re9: re9,
	"resident evil": [
	"resident evil requiem",
	"resident evil 9",
	"re9",
	"risdont evl 9",
	"re 9",
	"resident requin",
	"resident evil requiem delux",
	"resident evil hd",
	"ریزدیدنت ایفل 9"
],
	"risdont evl 9": [
	"resident evil requiem",
	"resident evil 9",
	"re9",
	"resident evil",
	"re 9",
	"resident requin",
	"resident evil requiem delux",
	"resident evil hd",
	"ریزدیدنت ایفل 9"
],
	"re 9": [
	"resident evil requiem",
	"resident evil 9",
	"re9",
	"resident evil",
	"risdont evl 9",
	"resident requin",
	"resident evil requiem delux",
	"resident evil hd",
	"ریزدیدنت ایفل 9"
],
	"resident requin": [
	"resident evil requiem",
	"resident evil 9",
	"re9",
	"resident evil",
	"risdont evl 9",
	"re 9",
	"resident evil requiem delux",
	"resident evil hd",
	"ریزدیدنت ایفل 9"
],
	"resident evil requiem delux": [
	"resident evil requiem",
	"resident evil 9",
	"re9",
	"resident evil",
	"risdont evl 9",
	"re 9",
	"resident requin",
	"resident evil hd",
	"ریزدیدنت ایفل 9"
],
	"resident evil hd": [
	"resident evil requiem",
	"resident evil 9",
	"re9",
	"resident evil",
	"risdont evl 9",
	"re 9",
	"resident requin",
	"resident evil requiem delux",
	"ریزدیدنت ایفل 9"
],
	"ریزدیدنت ایفل 9": [
	"resident evil requiem",
	"resident evil 9",
	"re9",
	"resident evil",
	"risdont evl 9",
	"re 9",
	"resident requin",
	"resident evil requiem delux",
	"resident evil hd"
],
	kena: kena,
	"kena ps5": [
	"kena",
	"kena ps4",
	"kena bridge"
],
	"kena ps4": [
	"kena",
	"kena ps5",
	"kena bridge"
],
	"kena bridge": [
	"kena",
	"kena ps5",
	"kena ps4"
],
	darksiuls: darksiuls,
	"dark souls": [
	"darksiuls",
	"souls",
	"soul",
	"dark"
],
	souls: souls,
	soul: soul,
	dark: dark,
	"nfs heat": [
	"need for speed",
	"heat",
	"nfs"
],
	"need for speed": [
	"nfs heat",
	"heat",
	"nfs"
],
	heat: heat,
	nfs: nfs,
	ps4: ps4,
	"playstation 4": [
	"ps4",
	"console 4",
	"sony 4",
	"بلاي 4",
	"play 4",
	"sony playstation 4",
	"play 4 slim",
	"play 4 fat",
	"ps4 fat",
	"ps4 pro",
	"ps4 slim",
	"ps4 slim version 9.00",
	"ps4 slim flash"
],
	"console 4": [
	"ps4",
	"playstation 4",
	"sony 4",
	"بلاي 4",
	"play 4",
	"sony playstation 4",
	"play 4 slim",
	"play 4 fat",
	"ps4 fat",
	"ps4 pro",
	"ps4 slim",
	"ps4 slim version 9.00",
	"ps4 slim flash"
],
	"sony 4": [
	"ps4",
	"playstation 4",
	"console 4",
	"بلاي 4",
	"play 4",
	"sony playstation 4",
	"play 4 slim",
	"play 4 fat",
	"ps4 fat",
	"ps4 pro",
	"ps4 slim",
	"ps4 slim version 9.00",
	"ps4 slim flash"
],
	"بلاي 4": [
	"ps4",
	"playstation 4",
	"console 4",
	"sony 4",
	"play 4",
	"sony playstation 4",
	"play 4 slim",
	"play 4 fat",
	"ps4 fat",
	"ps4 pro",
	"ps4 slim",
	"ps4 slim version 9.00",
	"ps4 slim flash"
],
	"play 4": [
	"ps4",
	"playstation 4",
	"console 4",
	"sony 4",
	"بلاي 4",
	"sony playstation 4",
	"play 4 slim",
	"play 4 fat",
	"ps4 fat",
	"ps4 pro",
	"ps4 slim",
	"ps4 slim version 9.00",
	"ps4 slim flash"
],
	"sony playstation 4": [
	"ps4",
	"playstation 4",
	"console 4",
	"sony 4",
	"بلاي 4",
	"play 4",
	"play 4 slim",
	"play 4 fat",
	"ps4 fat",
	"ps4 pro",
	"ps4 slim",
	"ps4 slim version 9.00",
	"ps4 slim flash"
],
	"play 4 slim": [
	"ps4",
	"playstation 4",
	"console 4",
	"sony 4",
	"بلاي 4",
	"play 4",
	"sony playstation 4",
	"play 4 fat",
	"ps4 fat",
	"ps4 pro",
	"ps4 slim",
	"ps4 slim version 9.00",
	"ps4 slim flash"
],
	"play 4 fat": [
	"ps4",
	"playstation 4",
	"console 4",
	"sony 4",
	"بلاي 4",
	"play 4",
	"sony playstation 4",
	"play 4 slim",
	"ps4 fat",
	"ps4 pro",
	"ps4 slim",
	"ps4 slim version 9.00",
	"ps4 slim flash"
],
	"ps4 fat": [
	"ps4",
	"playstation 4",
	"console 4",
	"sony 4",
	"بلاي 4",
	"play 4",
	"sony playstation 4",
	"play 4 slim",
	"play 4 fat",
	"ps4 pro",
	"ps4 slim",
	"ps4 slim version 9.00",
	"ps4 slim flash"
],
	"ps4 pro": [
	"ps4",
	"playstation 4",
	"console 4",
	"sony 4",
	"بلاي 4",
	"play 4",
	"sony playstation 4",
	"play 4 slim",
	"play 4 fat",
	"ps4 fat",
	"ps4 slim",
	"ps4 slim version 9.00",
	"ps4 slim flash"
],
	"ps4 slim": [
	"ps4",
	"playstation 4",
	"console 4",
	"sony 4",
	"بلاي 4",
	"play 4",
	"sony playstation 4",
	"play 4 slim",
	"play 4 fat",
	"ps4 fat",
	"ps4 pro",
	"ps4 slim version 9.00",
	"ps4 slim flash"
],
	"ps4 slim version 9.00": [
	"ps4",
	"playstation 4",
	"console 4",
	"sony 4",
	"بلاي 4",
	"play 4",
	"sony playstation 4",
	"play 4 slim",
	"play 4 fat",
	"ps4 fat",
	"ps4 pro",
	"ps4 slim",
	"ps4 slim flash"
],
	"ps4 slim flash": [
	"ps4",
	"playstation 4",
	"console 4",
	"sony 4",
	"بلاي 4",
	"play 4",
	"sony playstation 4",
	"play 4 slim",
	"play 4 fat",
	"ps4 fat",
	"ps4 pro",
	"ps4 slim",
	"ps4 slim version 9.00"
],
	forza: forza,
	"forza horizon": [
	"forza",
	"forza 5",
	"فوزا هریزه",
	"فورزا",
	"foza",
	"fora 5",
	"fonza 4",
	"forza horizon 4"
],
	"forza 5": [
	"forza",
	"forza horizon",
	"فوزا هریزه",
	"فورزا",
	"foza",
	"fora 5",
	"fonza 4",
	"forza horizon 4"
],
	"فوزا هریزه": [
	"forza",
	"forza horizon",
	"forza 5",
	"فورزا",
	"foza",
	"fora 5",
	"fonza 4",
	"forza horizon 4"
],
	"فورزا": [
	"forza",
	"forza horizon",
	"forza 5",
	"فوزا هریزه",
	"foza",
	"fora 5",
	"fonza 4",
	"forza horizon 4"
],
	foza: foza,
	"fora 5": [
	"forza",
	"forza horizon",
	"forza 5",
	"فوزا هریزه",
	"فورزا",
	"foza",
	"fonza 4",
	"forza horizon 4"
],
	"fonza 4": [
	"forza",
	"forza horizon",
	"forza 5",
	"فوزا هریزه",
	"فورزا",
	"foza",
	"fora 5",
	"forza horizon 4"
],
	"forza horizon 4": [
	"forza",
	"forza horizon",
	"forza 5",
	"فوزا هریزه",
	"فورزا",
	"foza",
	"fora 5",
	"fonza 4"
],
	ps5: ps5,
	"ps5 slim": [
	"ps5",
	"ps5 fat",
	"ps5 pro",
	"بيس فايف",
	"بالي سانك",
	"بلاي فايف",
	"بلاي 5",
	"بلاي",
	"playstation 5",
	"ps",
	"ps5 console",
	"console",
	"next gen",
	"sony playstation 5"
],
	"ps5 fat": [
	"ps5",
	"ps5 slim",
	"ps5 pro",
	"بيس فايف",
	"بالي سانك",
	"بلاي فايف",
	"بلاي 5",
	"بلاي",
	"playstation 5",
	"ps",
	"ps5 console",
	"console",
	"next gen",
	"sony playstation 5"
],
	"ps5 pro": [
	"ps5",
	"ps5 slim",
	"ps5 fat",
	"بيس فايف",
	"بالي سانك",
	"بلاي فايف",
	"بلاي 5",
	"بلاي",
	"playstation 5",
	"ps",
	"ps5 console",
	"console",
	"next gen",
	"sony playstation 5"
],
	"بيس فايف": [
	"ps5",
	"ps5 slim",
	"ps5 fat",
	"ps5 pro",
	"بالي سانك",
	"بلاي فايف",
	"بلاي 5",
	"بلاي",
	"playstation 5",
	"ps",
	"ps5 console",
	"console",
	"next gen",
	"sony playstation 5"
],
	"بالي سانك": [
	"ps5",
	"ps5 slim",
	"ps5 fat",
	"ps5 pro",
	"بيس فايف",
	"بلاي فايف",
	"بلاي 5",
	"بلاي",
	"playstation 5",
	"ps",
	"ps5 console",
	"console",
	"next gen",
	"sony playstation 5"
],
	"بلاي فايف": [
	"ps5",
	"ps5 slim",
	"ps5 fat",
	"ps5 pro",
	"بيس فايف",
	"بالي سانك",
	"بلاي 5",
	"بلاي",
	"playstation 5",
	"ps",
	"ps5 console",
	"console",
	"next gen",
	"sony playstation 5"
],
	"بلاي 5": [
	"ps5",
	"ps5 slim",
	"ps5 fat",
	"ps5 pro",
	"بيس فايف",
	"بالي سانك",
	"بلاي فايف",
	"بلاي",
	"playstation 5",
	"ps",
	"ps5 console",
	"console",
	"next gen",
	"sony playstation 5"
],
	"بلاي": [
	"ps5",
	"ps5 slim",
	"ps5 fat",
	"ps5 pro",
	"بيس فايف",
	"بالي سانك",
	"بلاي فايف",
	"بلاي 5",
	"playstation 5",
	"ps",
	"ps5 console",
	"console",
	"next gen",
	"sony playstation 5"
],
	"playstation 5": [
	"ps5",
	"ps5 slim",
	"ps5 fat",
	"ps5 pro",
	"بيس فايف",
	"بالي سانك",
	"بلاي فايف",
	"بلاي 5",
	"بلاي",
	"ps",
	"ps5 console",
	"console",
	"next gen",
	"sony playstation 5"
],
	ps: ps,
	"ps5 console": [
	"ps5",
	"ps5 slim",
	"ps5 fat",
	"ps5 pro",
	"بيس فايف",
	"بالي سانك",
	"بلاي فايف",
	"بلاي 5",
	"بلاي",
	"playstation 5",
	"ps",
	"console",
	"next gen",
	"sony playstation 5"
],
	console: console,
	"next gen": [
	"ps5",
	"ps5 slim",
	"ps5 fat",
	"ps5 pro",
	"بيس فايف",
	"بالي سانك",
	"بلاي فايف",
	"بلاي 5",
	"بلاي",
	"playstation 5",
	"ps",
	"ps5 console",
	"console",
	"sony playstation 5"
],
	"sony playstation 5": [
	"ps5",
	"ps5 slim",
	"ps5 fat",
	"ps5 pro",
	"بيس فايف",
	"بالي سانك",
	"بلاي فايف",
	"بلاي 5",
	"بلاي",
	"playstation 5",
	"ps",
	"ps5 console",
	"console",
	"next gen"
],
	"t-shirt": [
	"shirt",
	"shir",
	"tshirt",
	"triko",
	"تريكو",
	"sweet shirt",
	"trikowat",
	"hoddie",
	"sweet",
	"labsa"
],
	shirt: shirt,
	shir: shir,
	tshirt: tshirt,
	triko: triko,
	"تريكو": [
	"t-shirt",
	"shirt",
	"shir",
	"tshirt",
	"triko",
	"sweet shirt",
	"trikowat",
	"hoddie",
	"sweet",
	"labsa"
],
	"sweet shirt": [
	"t-shirt",
	"shirt",
	"shir",
	"tshirt",
	"triko",
	"تريكو",
	"trikowat",
	"hoddie",
	"sweet",
	"labsa"
],
	trikowat: trikowat,
	hoddie: hoddie,
	sweet: sweet,
	labsa: labsa,
	"read dead redemption": [
	"rdd",
	"rdr",
	"rdr 2",
	"red dead redemption",
	"rdd 2",
	"ريدمبشن",
	"ريد ديد ريدمبشن",
	"red ded",
	"رداد",
	"rid diiiii ronamrtion 2",
	"rodad",
	"ردد2 اکس بوکس وان"
],
	rdd: rdd,
	rdr: rdr,
	"rdr 2": [
	"read dead redemption",
	"rdd",
	"rdr",
	"red dead redemption",
	"rdd 2",
	"ريدمبشن",
	"ريد ديد ريدمبشن",
	"red ded",
	"رداد",
	"rid diiiii ronamrtion 2",
	"rodad",
	"ردد2 اکس بوکس وان"
],
	"red dead redemption": [
	"read dead redemption",
	"rdd",
	"rdr",
	"rdr 2",
	"rdd 2",
	"ريدمبشن",
	"ريد ديد ريدمبشن",
	"red ded",
	"رداد",
	"rid diiiii ronamrtion 2",
	"rodad",
	"ردد2 اکس بوکس وان"
],
	"rdd 2": [
	"read dead redemption",
	"rdd",
	"rdr",
	"rdr 2",
	"red dead redemption",
	"ريدمبشن",
	"ريد ديد ريدمبشن",
	"red ded",
	"رداد",
	"rid diiiii ronamrtion 2",
	"rodad",
	"ردد2 اکس بوکس وان"
],
	"ريدمبشن": [
	"read dead redemption",
	"rdd",
	"rdr",
	"rdr 2",
	"red dead redemption",
	"rdd 2",
	"ريد ديد ريدمبشن",
	"red ded",
	"رداد",
	"rid diiiii ronamrtion 2",
	"rodad",
	"ردد2 اکس بوکس وان"
],
	"ريد ديد ريدمبشن": [
	"read dead redemption",
	"rdd",
	"rdr",
	"rdr 2",
	"red dead redemption",
	"rdd 2",
	"ريدمبشن",
	"red ded",
	"رداد",
	"rid diiiii ronamrtion 2",
	"rodad",
	"ردد2 اکس بوکس وان"
],
	"red ded": [
	"read dead redemption",
	"rdd",
	"rdr",
	"rdr 2",
	"red dead redemption",
	"rdd 2",
	"ريدمبشن",
	"ريد ديد ريدمبشن",
	"رداد",
	"rid diiiii ronamrtion 2",
	"rodad",
	"ردد2 اکس بوکس وان"
],
	"رداد": [
	"read dead redemption",
	"rdd",
	"rdr",
	"rdr 2",
	"red dead redemption",
	"rdd 2",
	"ريدمبشن",
	"ريد ديد ريدمبشن",
	"red ded",
	"rid diiiii ronamrtion 2",
	"rodad",
	"ردد2 اکس بوکس وان"
],
	"rid diiiii ronamrtion 2": [
	"read dead redemption",
	"rdd",
	"rdr",
	"rdr 2",
	"red dead redemption",
	"rdd 2",
	"ريدمبشن",
	"ريد ديد ريدمبشن",
	"red ded",
	"رداد",
	"rodad",
	"ردد2 اکس بوکس وان"
],
	rodad: rodad,
	"ردد2 اکس بوکس وان": [
	"read dead redemption",
	"rdd",
	"rdr",
	"rdr 2",
	"red dead redemption",
	"rdd 2",
	"ريدمبشن",
	"ريد ديد ريدمبشن",
	"red ded",
	"رداد",
	"rid diiiii ronamrtion 2",
	"rodad"
],
	fifa: fifa,
	fc: fc,
	lamal: lamal,
	halland: halland,
	"f c": [
	"fifa",
	"fc",
	"lamal",
	"halland",
	"balon",
	"foot",
	"فيفا",
	"فيف",
	"fc 26",
	"f 26",
	"fofa 26",
	"fila",
	"fina",
	"fofla"
],
	balon: balon,
	foot: foot,
	"فيفا": [
	"fifa",
	"fc",
	"lamal",
	"halland",
	"f c",
	"balon",
	"foot",
	"فيف",
	"fc 26",
	"f 26",
	"fofa 26",
	"fila",
	"fina",
	"fofla"
],
	"فيف": [
	"fifa",
	"fc",
	"lamal",
	"halland",
	"f c",
	"balon",
	"foot",
	"فيفا",
	"fc 26",
	"f 26",
	"fofa 26",
	"fila",
	"fina",
	"fofla"
],
	"fc 26": [
	"fifa",
	"fc",
	"lamal",
	"halland",
	"f c",
	"balon",
	"foot",
	"فيفا",
	"فيف",
	"f 26",
	"fofa 26",
	"fila",
	"fina",
	"fofla"
],
	"f 26": [
	"fifa",
	"fc",
	"lamal",
	"halland",
	"f c",
	"balon",
	"foot",
	"فيفا",
	"فيف",
	"fc 26",
	"fofa 26",
	"fila",
	"fina",
	"fofla"
],
	"fofa 26": [
	"fifa",
	"fc",
	"lamal",
	"halland",
	"f c",
	"balon",
	"foot",
	"فيفا",
	"فيف",
	"fc 26",
	"f 26",
	"fila",
	"fina",
	"fofla"
],
	fila: fila,
	fina: fina,
	fofla: fofla,
	gta: gta,
	"g t a": [
	"gta",
	"san andreas",
	"vice city",
	"جي تي ايه",
	"hta",
	"جتيا",
	"جيتيا",
	"gta v",
	"gta san",
	"kahloch",
	"gta ps4",
	"gta ps5",
	"gt 5",
	"grand theft auto"
],
	"san andreas": [
	"gta",
	"g t a",
	"vice city",
	"جي تي ايه",
	"hta",
	"جتيا",
	"جيتيا",
	"gta v",
	"gta san",
	"kahloch",
	"gta ps4",
	"gta ps5",
	"gt 5",
	"grand theft auto"
],
	"vice city": [
	"gta",
	"g t a",
	"san andreas",
	"جي تي ايه",
	"hta",
	"جتيا",
	"جيتيا",
	"gta v",
	"gta san",
	"kahloch",
	"gta ps4",
	"gta ps5",
	"gt 5",
	"grand theft auto"
],
	"جي تي ايه": [
	"gta",
	"g t a",
	"san andreas",
	"vice city",
	"hta",
	"جتيا",
	"جيتيا",
	"gta v",
	"gta san",
	"kahloch",
	"gta ps4",
	"gta ps5",
	"gt 5",
	"grand theft auto"
],
	hta: hta,
	"جتيا": [
	"gta",
	"g t a",
	"san andreas",
	"vice city",
	"جي تي ايه",
	"hta",
	"جيتيا",
	"gta v",
	"gta san",
	"kahloch",
	"gta ps4",
	"gta ps5",
	"gt 5",
	"grand theft auto"
],
	"جيتيا": [
	"gta",
	"g t a",
	"san andreas",
	"vice city",
	"جي تي ايه",
	"hta",
	"جتيا",
	"gta v",
	"gta san",
	"kahloch",
	"gta ps4",
	"gta ps5",
	"gt 5",
	"grand theft auto"
],
	"gta v": [
	"gta",
	"g t a",
	"san andreas",
	"vice city",
	"جي تي ايه",
	"hta",
	"جتيا",
	"جيتيا",
	"gta san",
	"kahloch",
	"gta ps4",
	"gta ps5",
	"gt 5",
	"grand theft auto"
],
	"gta san": [
	"gta",
	"g t a",
	"san andreas",
	"vice city",
	"جي تي ايه",
	"hta",
	"جتيا",
	"جيتيا",
	"gta v",
	"kahloch",
	"gta ps4",
	"gta ps5",
	"gt 5",
	"grand theft auto"
],
	kahloch: kahloch,
	"gta ps4": [
	"gta",
	"g t a",
	"san andreas",
	"vice city",
	"جي تي ايه",
	"hta",
	"جتيا",
	"جيتيا",
	"gta v",
	"gta san",
	"kahloch",
	"gta ps5",
	"gt 5",
	"grand theft auto"
],
	"gta ps5": [
	"gta",
	"g t a",
	"san andreas",
	"vice city",
	"جي تي ايه",
	"hta",
	"جتيا",
	"جيتيا",
	"gta v",
	"gta san",
	"kahloch",
	"gta ps4",
	"gt 5",
	"grand theft auto"
],
	"gt 5": [
	"gta",
	"g t a",
	"san andreas",
	"vice city",
	"جي تي ايه",
	"hta",
	"جتيا",
	"جيتيا",
	"gta v",
	"gta san",
	"kahloch",
	"gta ps4",
	"gta ps5",
	"grand theft auto"
],
	"grand theft auto": [
	"gta",
	"g t a",
	"gta 6",
	"grand theft auto 6",
	"gta vi",
	"PRÉCOMMANDE | GTA VI | PS5 | (COMPTE DIGITAL)",
	"PRÉCOMMANDE | GTA VI | XBOX SERIES X|S | (COMPTE DIGITAL)",
	"san andreas",
	"vice city",
	"جي تي ايه",
	"hta",
	"جتيا",
	"جيتيا",
	"gta v",
	"gta san",
	"kahloch",
	"gta ps4",
	"gta ps5",
	"gt 5"
]
};

const dict_get = defineEventHandler(async () => {
  const client = useMeilisearch();
  const index = client.index("products");
  await index.updateSynonyms(synon);
  return { ok: true, synon };
});

export { dict_get as default };
//# sourceMappingURL=dict.get.mjs.map
