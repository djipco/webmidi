window.lunrData = {
  "index": {
    "version": "1.0.0",
    "fields": [
      {
        "name": "longname",
        "boost": 1000
      },
      {
        "name": "name",
        "boost": 500
      },
      {
        "name": "tags",
        "boost": 300
      },
      {
        "name": "kind",
        "boost": 110
      },
      {
        "name": "title",
        "boost": 100
      },
      {
        "name": "summary",
        "boost": 70
      },
      {
        "name": "description",
        "boost": 50
      },
      {
        "name": "body",
        "boost": 1
      }
    ],
    "ref": "id",
    "tokenizer": "default",
    "documentStore": {
      "store": {
        "index.html": [
          "api",
          "help",
          "index",
          "javascript",
          "librari",
          "midi",
          "readm",
          "tame",
          "web",
          "webmidi.j"
        ],
        "global.html": [
          "document",
          "global"
        ],
        "list_class.html": [
          "class",
          "document",
          "list",
          "list:class"
        ],
        "Input.html": [
          "array",
          "avail",
          "class",
          "deriv",
          "directli",
          "export",
          "find",
          "host'",
          "input",
          "instanti",
          "list",
          "midi",
          "object",
          "port",
          "reason",
          "repres",
          "subsystem",
          "webmidi#input",
          "webmidi.j"
        ],
        "Input.html#.NRPN_TYPES": [
          "array",
          "array.&lt;string&gt",
          "input.nrpn_typ",
          "lt;static",
          "member",
          "non",
          "nrpn",
          "nrpn_type",
          "number",
          "paramet",
          "readonly&gt",
          "regist",
          "type",
          "valid"
        ],
        "Input.html#connection": [
          "close",
          "connect",
          "input",
          "input#connect",
          "lt;readonly&gt",
          "member",
          "open",
          "pend",
          "port'",
          "state",
          "string"
        ],
        "Input.html#id": [
          "chrome",
          "complet",
          "differ",
          "exampl",
          "expect",
          "googl",
          "host",
          "id",
          "input#id",
          "jazz",
          "lt;readonly&gt",
          "member",
          "midi",
          "platform",
          "plugin",
          "port",
          "report",
          "same",
          "specif",
          "string"
        ],
        "Input.html#manufacturer": [
          "avail",
          "devic",
          "input",
          "input#manufactur",
          "lt;readonly&gt",
          "make",
          "manufactur",
          "member",
          "name",
          "port",
          "string"
        ],
        "Input.html#name": [
          "input",
          "input#nam",
          "member",
          "midi",
          "name",
          "string"
        ],
        "Input.html#nrpnEventsEnabled": [
          "boolean",
          "buffer",
          "chang",
          "collector",
          "compos",
          "control",
          "discard",
          "dispatch",
          "event",
          "fall",
          "fire",
          "incomplet",
          "indic",
          "input",
          "input#nrpneventsen",
          "invalid",
          "logic",
          "member",
          "messag",
          "non",
          "nrpn",
          "nrpneventsen",
          "number",
          "order",
          "out",
          "paramet",
          "receiv",
          "regist",
          "sequenc",
          "set",
          "specif",
          "such",
          "system",
          "through",
          "valid",
          "whether",
          "wide"
        ],
        "Input.html#state": [
          "connect",
          "disconnect",
          "input",
          "input#st",
          "lt;readonly&gt",
          "member",
          "port",
          "state",
          "string"
        ],
        "Input.html#type": [
          "input",
          "input#typ",
          "lt;readonly&gt",
          "member",
          "port",
          "string",
          "type"
        ],
        "Input.html#destroy": [
          "destroy",
          "function",
          "input#destroy",
          "lt;async&gt",
          "promise.&lt;void&gt"
        ],
        "Input.html#getCcNameByNumber": [
          "chang",
          "control",
          "fals",
          "found",
          "function",
          "getccnamebynumb",
          "input#getccnamebynumb",
          "match",
          "messag",
          "name",
          "number",
          "return",
          "specifi",
          "string|fals"
        ],
        "Input.html#getChannelModeByNumber": [
          "channel",
          "fals",
          "found",
          "function",
          "getchannelmodebynumb",
          "input#getchannelmodebynumb",
          "match",
          "mode",
          "name",
          "number",
          "return",
          "specifi",
          "string|fals"
        ],
        "Input.html#open": [
          "function",
          "input",
          "input#open",
          "lt;async&gt",
          "open",
          "promise.&lt;input&gt",
          "usag"
        ],
        "InputChannel.html": [
          "class",
          "inputchannel"
        ],
        "InputChannel.html#number": [
          "1",
          "16",
          "channel",
          "inputchannel#numb",
          "member",
          "number"
        ],
        "InputChannel.html#output": [
          "belong",
          "channel",
          "inputchannel#output",
          "member",
          "output"
        ],
        "Output.html": [
          "array",
          "avail",
          "class",
          "deriv",
          "directli",
          "export",
          "find",
          "host'",
          "instanti",
          "list",
          "midi",
          "object",
          "output",
          "port",
          "reason",
          "repres",
          "subsystem",
          "webmidi#output",
          "webmidi.j"
        ],
        "Output.html#channels": [
          "1",
          "16",
          "array",
          "array.&lt;outputchannel&gt",
          "avail",
          "channel",
          "contain",
          "member",
          "object",
          "output",
          "output#channel",
          "outputchannel"
        ],
        "Output.html#connection": [
          "close",
          "connect",
          "lt;readonly&gt",
          "member",
          "open",
          "output",
          "output#connect",
          "pend",
          "port'",
          "state",
          "string"
        ],
        "Output.html#id": [
          "chrome",
          "complet",
          "differ",
          "exampl",
          "expect",
          "googl",
          "host",
          "id",
          "jazz",
          "lt;readonly&gt",
          "member",
          "midi",
          "output",
          "output#id",
          "platform",
          "plugin",
          "port",
          "report",
          "same",
          "specif",
          "string"
        ],
        "Output.html#manufacturer": [
          "avail",
          "devic",
          "lt;readonly&gt",
          "make",
          "manufactur",
          "member",
          "name",
          "output",
          "output#manufactur",
          "port",
          "string"
        ],
        "Output.html#name": [
          "lt;readonly&gt",
          "member",
          "midi",
          "name",
          "output",
          "output#nam",
          "string"
        ],
        "Output.html#state": [
          "connect",
          "disconnect",
          "lt;readonly&gt",
          "member",
          "output",
          "output#st",
          "port",
          "state",
          "string"
        ],
        "Output.html#type": [
          "lt;readonly&gt",
          "member",
          "output",
          "output#typ",
          "port",
          "string",
          "type"
        ],
        "Output.html#clear": [
          "browser",
          "clear",
          "defin",
          "deliv",
          "function",
          "implement",
          "messag",
          "method",
          "output",
          "output#clear",
          "queu",
          "soon",
          "specif",
          "warn",
          "work"
        ],
        "Output.html#close": [
          "close",
          "function",
          "lt;async&gt",
          "messag",
          "midi",
          "output",
          "output#clos",
          "promise.&lt;(void|any)&gt",
          "send",
          "us"
        ],
        "Output.html#destroy": [
          "destroy",
          "function",
          "lt;async&gt",
          "output#destroy",
          "promise.&lt;void&gt"
        ],
        "Output.html#open": [
          "function",
          "lt;async&gt",
          "open",
          "output",
          "output#open",
          "promise.&lt;output&gt",
          "usag"
        ],
        "Output.html#send": [
          "associ",
          "avail",
          "data",
          "detail",
          "directli",
          "etc",
          "familiar",
          "format",
          "function",
          "helper",
          "instead",
          "manufactur",
          "messag",
          "method",
          "midi",
          "on",
          "output",
          "output#send",
          "playnot",
          "port",
          "schedul",
          "send",
          "sendcontrolchang",
          "sendsystemmessag",
          "simpler",
          "statu",
          "stopnot",
          "summari",
          "timestamp",
          "unless",
          "us"
        ],
        "Output.html#sendActiveSensing": [
          "300",
          "activ",
          "connect",
          "devic",
          "function",
          "good",
          "messag",
          "midi",
          "ms",
          "option",
          "output",
          "output#sendactivesens",
          "port",
          "real",
          "send",
          "sendactivesens",
          "sens",
          "sent",
          "still",
          "tell",
          "time"
        ],
        "Output.html#sendChannelAftertouch": [
          "aftertouch",
          "channel",
          "channel(",
          "function",
          "instead",
          "key",
          "messag",
          "midi",
          "option",
          "output",
          "output#sendchannelaftertouch",
          "pressur",
          "send",
          "sendchannelaftertouch",
          "sendkeyaftertouch",
          "specif",
          "specifi",
          "us"
        ],
        "Output.html#sendClock": [
          "24",
          "accord",
          "clock",
          "function",
          "messag",
          "midi",
          "note",
          "option",
          "output",
          "output#sendclock",
          "quarter",
          "real",
          "send",
          "sendclock",
          "standard",
          "time"
        ],
        "Output.html#sendContinue": [
          "continu",
          "cu",
          "function",
          "last",
          "messag",
          "method",
          "option",
          "output#sendcontinu",
          "playback",
          "posit",
          "previous",
          "real",
          "resum",
          "send",
          "sendcontinu",
          "sendstart",
          "song",
          "start",
          "stop",
          "time",
          "us",
          "webmidi"
        ],
        "Output.html#sendControlChange": [
          "0",
          "1",
          "10",
          "100",
          "101",
          "11",
          "12",
          "13",
          "16",
          "17",
          "18",
          "19",
          "2",
          "3",
          "32",
          "33",
          "34",
          "36",
          "37",
          "38",
          "39",
          "4",
          "40",
          "42",
          "43",
          "44",
          "45",
          "5",
          "6",
          "64",
          "65",
          "66",
          "67",
          "68",
          "69",
          "7",
          "70",
          "71",
          "72",
          "73",
          "74",
          "75",
          "76",
          "77",
          "78",
          "79",
          "8",
          "80",
          "81",
          "82",
          "83",
          "91",
          "92",
          "93",
          "94",
          "95",
          "96",
          "97",
          "98",
          "99",
          "abov",
          "avail",
          "balancecoars",
          "balancefin",
          "bankselectcoars",
          "bankselectfin",
          "breathcontrollercoars",
          "breathcontrollerfin",
          "bright",
          "celestelevel",
          "chang",
          "channel",
          "channel(",
          "choruslevel",
          "common",
          "consult",
          "control",
          "databuttondecr",
          "databuttonincr",
          "dataentrycoars",
          "dataentryfin",
          "effectcontrol1coars",
          "effectcontrol1fin",
          "effectcontrol2coars",
          "effectcontrol2fin",
          "expressioncoars",
          "expressionfin",
          "follow",
          "footcontrollercoars",
          "footcontrollerfin",
          "function",
          "generalpurposebutton1",
          "generalpurposebutton2",
          "generalpurposebutton3",
          "generalpurposebutton4",
          "generalpurposeslider1",
          "generalpurposeslider2",
          "generalpurposeslider3",
          "generalpurposeslider4",
          "hold2ped",
          "holdped",
          "instead",
          "legatoped",
          "list",
          "match",
          "mean",
          "messag",
          "midi",
          "modulationwheelcoars",
          "modulationwheelfin",
          "name",
          "need",
          "nonregisteredparametercoars",
          "nonregisteredparameterfin",
          "note",
          "number",
          "numer",
          "on",
          "option",
          "other",
          "output",
          "output#sendcontrolchang",
          "pancoars",
          "panfin",
          "phaserlevel",
          "pleas",
          "portamento",
          "portamentotimecoars",
          "portamentotimefin",
          "registeredparametercoars",
          "registeredparameterfin",
          "reson",
          "reverblevel",
          "schedul",
          "see",
          "send",
          "sendcontrolchang",
          "simpli",
          "softped",
          "soundattacktim",
          "soundcontrol10",
          "soundcontrol6",
          "soundcontrol7",
          "soundcontrol8",
          "soundcontrol9",
          "soundreleasetim",
          "soundvari",
          "specif",
          "specifi",
          "sustenutoped",
          "tabl",
          "time",
          "tremololevel",
          "us",
          "valu",
          "view",
          "volumecoars",
          "volumefin"
        ],
        "Output.html#sendKeyAftertouch": [
          "aftertouch",
          "channel",
          "channel(",
          "function",
          "key",
          "messag",
          "midi",
          "note",
          "option",
          "output",
          "output#sendkeyaftertouch",
          "pressur",
          "schedul",
          "send",
          "sendchannelaftertouch",
          "sendkeyaftertouch",
          "specif",
          "specifi",
          "time",
          "us",
          "wide"
        ],
        "Output.html#sendReset": [
          "connect",
          "default",
          "devic",
          "function",
          "itself",
          "messag",
          "option",
          "output",
          "output#sendreset",
          "real",
          "reset",
          "send",
          "sendreset",
          "state",
          "tell",
          "time"
        ],
        "Output.html#sendSongPosition": [
          "0",
          "16383",
          "16th",
          "alway",
          "beat",
          "between",
          "express",
          "function",
          "messag",
          "midi",
          "note",
          "option",
          "output",
          "output#sendsongposit",
          "posit",
          "send",
          "sendsongposit",
          "song",
          "start",
          "valu"
        ],
        "Output.html#sendSongSelect": [
          "0",
          "1",
          "bewar",
          "devic",
          "display",
          "friendli",
          "function",
          "messag",
          "midi",
          "option",
          "output",
          "output#sendsongselect",
          "posit",
          "select",
          "send",
          "sendsongselect",
          "song",
          "user",
          "valu"
        ],
        "Output.html#sendStart": [
          "0",
          "beat",
          "current",
          "elsewher",
          "function",
          "messag",
          "method",
          "midi",
          "option",
          "output",
          "output#sendstart",
          "playback",
          "real",
          "send",
          "sendcontinu",
          "sendstart",
          "song",
          "start",
          "time",
          "us"
        ],
        "Output.html#sendStop": [
          "connect",
          "devic",
          "function",
          "immedi",
          "messag",
          "option",
          "output",
          "output#sendstop",
          "playback",
          "real",
          "schedul",
          "send",
          "sendstop",
          "stop",
          "tell",
          "time"
        ],
        "Output.html#sendSysex": [
          "0x09",
          "0x1",
          "0x2",
          "0x21",
          "0x3",
          "0x4",
          "0x5",
          "0xf0",
          "0xf7",
          "1",
          "2",
          "3",
          "4",
          "42",
          "5",
          "64kb",
          "66",
          "abov",
          "array",
          "automat",
          "below",
          "binari",
          "browser",
          "byte",
          "call",
          "case",
          "code",
          "connect",
          "console.log(\"system",
          "data",
          "decim",
          "depend",
          "devic",
          "enabl",
          "end",
          "equival",
          "etc",
          "exampl",
          "exclus",
          "first",
          "follow",
          "function",
          "gener",
          "gt",
          "hex",
          "http",
          "identifi",
          "instrument",
          "keep",
          "korg",
          "length",
          "less",
          "limit",
          "manufactur",
          "messag",
          "method",
          "midi",
          "nativ",
          "necessari",
          "notat",
          "note",
          "number",
          "option",
          "output",
          "output#sendsysex",
          "over",
          "page",
          "paramet",
          "platform",
          "posit",
          "prepend",
          "same",
          "send",
          "sendsysex",
          "serv",
          "set",
          "specifi",
          "suggest",
          "support",
          "sysex",
          "system",
          "termin",
          "therefor",
          "true",
          "us",
          "valu",
          "version",
          "want",
          "webmidi.en",
          "webmidi.enable({sysex",
          "webmidi.outputs[0].sendsysex(0x42",
          "webmidi.outputs[0].sendsysex(66",
          "webmidi.outputs[0].sendsysex([0x00"
        ],
        "Output.html#sendTimecodeQuarterFrame": [
          "accord",
          "be",
          "data",
          "develop",
          "done",
          "format",
          "frame",
          "function",
          "messag",
          "midi",
          "note",
          "option",
          "output",
          "output#sendtimecodequarterfram",
          "pleas",
          "process",
          "quarter",
          "send",
          "sendtimecodequarterfram",
          "timecod",
          "up",
          "valu"
        ],
        "Output.html#sendTuneRequest": [
          "function",
          "messag",
          "midi",
          "option",
          "output",
          "output#sendtunerequest",
          "real",
          "request",
          "send",
          "sendtunerequest",
          "time",
          "tune"
        ],
        "Output.html#setPitchBendRange": [
          "adjust",
          "bend",
          "both",
          "cent",
          "channel",
          "channel(",
          "function",
          "lever",
          "lsb",
          "messag",
          "msb",
          "option",
          "output",
          "output#setpitchbendrang",
          "paramet",
          "pitch",
          "rang",
          "same",
          "schedul",
          "semiton",
          "send",
          "setpitchbendrang",
          "specifi",
          "time",
          "us"
        ],
        "Output.html#setRegisteredParameter": [
          "0",
          "0x00",
          "0x01",
          "0x02",
          "0x03",
          "0x04",
          "0x05",
          "0x06",
          "0x07",
          "0x08",
          "0x3d",
          "1.0",
          "127",
          "3d",
          "ad",
          "angl",
          "anoth",
          "azimuth",
          "azimuthangl",
          "bank",
          "byte",
          "chang",
          "channel",
          "channelcoarsetun",
          "channelfinetun",
          "coars",
          "control",
          "data",
          "defin",
          "desir",
          "distanc",
          "distanceratio",
          "each",
          "elev",
          "elevationangl",
          "etc",
          "extend",
          "extra",
          "familiar",
          "favour",
          "fine",
          "first",
          "function",
          "gain",
          "go",
          "here",
          "identifi",
          "implement",
          "later",
          "limit",
          "list",
          "maximum",
          "maximumdist",
          "maximumdistancegain",
          "messag",
          "midi",
          "modul",
          "modulationrang",
          "note",
          "number",
          "on",
          "option",
          "origin",
          "output",
          "output#setregisteredparamet",
          "pan",
          "panspreadangl",
          "paramet",
          "part",
          "pitchbend",
          "pitchbendrang",
          "probabl",
          "program",
          "rang",
          "ratio",
          "refer",
          "referencedistanceratio",
          "regist",
          "roll",
          "rollangl",
          "set",
          "setmastertun",
          "setmodulationrang",
          "setpitchbendrang",
          "setregisteredparamet",
          "simpler",
          "sound",
          "specif",
          "specifi",
          "spread",
          "standard",
          "such",
          "tune",
          "tuningbank",
          "tuningprogram",
          "two",
          "unless",
          "up",
          "us",
          "valu",
          "veri",
          "wide"
        ],
        "OutputChannel.html": [
          "class",
          "outputchannel"
        ],
        "OutputChannel.html#number": [
          "1",
          "16",
          "channel",
          "member",
          "number",
          "outputchannel#numb"
        ],
        "OutputChannel.html#output": [
          "belong",
          "channel",
          "member",
          "output",
          "outputchannel#output"
        ],
        "OutputChannel.html#send": [
          "associ",
          "avail",
          "data",
          "detail",
          "directli",
          "etc",
          "familiar",
          "format",
          "function",
          "helper",
          "instead",
          "manufactur",
          "messag",
          "method",
          "midi",
          "on",
          "output",
          "outputchannel#send",
          "playnot",
          "schedul",
          "send",
          "sendcontrolchang",
          "simpler",
          "statu",
          "stopnot",
          "summari",
          "timestamp",
          "unless",
          "us"
        ],
        "OutputChannel.html#sendControlChange": [
          "0",
          "1",
          "10",
          "100",
          "101",
          "11",
          "12",
          "13",
          "16",
          "17",
          "18",
          "19",
          "2",
          "3",
          "32",
          "33",
          "34",
          "36",
          "37",
          "38",
          "39",
          "4",
          "40",
          "42",
          "43",
          "44",
          "45",
          "5",
          "6",
          "64",
          "65",
          "66",
          "67",
          "68",
          "69",
          "7",
          "70",
          "71",
          "72",
          "73",
          "74",
          "75",
          "76",
          "77",
          "78",
          "79",
          "8",
          "80",
          "81",
          "82",
          "83",
          "91",
          "92",
          "93",
          "94",
          "95",
          "96",
          "97",
          "98",
          "99",
          "abov",
          "avail",
          "balancecoars",
          "balancefin",
          "bankselectcoars",
          "bankselectfin",
          "breathcontrollercoars",
          "breathcontrollerfin",
          "bright",
          "celestelevel",
          "chang",
          "channel",
          "choruslevel",
          "common",
          "consult",
          "control",
          "databuttondecr",
          "databuttonincr",
          "dataentrycoars",
          "dataentryfin",
          "detail",
          "effectcontrol1coars",
          "effectcontrol1fin",
          "effectcontrol2coars",
          "effectcontrol2fin",
          "expressioncoars",
          "expressionfin",
          "follow",
          "footcontrollercoars",
          "footcontrollerfin",
          "function",
          "generalpurposebutton1",
          "generalpurposebutton2",
          "generalpurposebutton3",
          "generalpurposebutton4",
          "generalpurposeslider1",
          "generalpurposeslider2",
          "generalpurposeslider3",
          "generalpurposeslider4",
          "hold2ped",
          "holdped",
          "instead",
          "legatoped",
          "list",
          "match",
          "mean",
          "messag",
          "midi",
          "modulationwheelcoars",
          "modulationwheelfin",
          "name",
          "need",
          "nonregisteredparametercoars",
          "nonregisteredparameterfin",
          "note",
          "number",
          "numer",
          "on",
          "option",
          "other",
          "output",
          "outputchannel#sendcontrolchang",
          "pancoars",
          "panfin",
          "phaserlevel",
          "pleas",
          "portamento",
          "portamentotimecoars",
          "portamentotimefin",
          "registeredparametercoars",
          "registeredparameterfin",
          "reson",
          "reverblevel",
          "schedul",
          "see",
          "send",
          "sendcontrolchang",
          "simpli",
          "softped",
          "soundattacktim",
          "soundcontrol10",
          "soundcontrol6",
          "soundcontrol7",
          "soundcontrol8",
          "soundcontrol9",
          "soundreleasetim",
          "soundvari",
          "specif",
          "specifi",
          "sustenutoped",
          "tabl",
          "time",
          "tremololevel",
          "us",
          "valu",
          "view",
          "volumecoars",
          "volumefin"
        ],
        "OutputChannel.html#sendKeyAftertouch": [
          "aftertouch",
          "channel",
          "function",
          "key",
          "messag",
          "midi",
          "note",
          "option",
          "outputchannel",
          "outputchannel#sendchannelaftertouch",
          "outputchannel#sendkeyaftertouch",
          "pressur",
          "schedul",
          "send",
          "sendkeyaftertouch",
          "specif",
          "time",
          "us",
          "wide"
        ],
        "WebMidi.html": [
          "alreadi",
          "api",
          "basic",
          "call",
          "cj",
          "class",
          "commonj",
          "directli",
          "djipev",
          "easier",
          "es6",
          "esm",
          "eventemitt",
          "extend",
          "global",
          "iif",
          "incom",
          "instanti",
          "librari",
          "make",
          "mean",
          "messag",
          "midi",
          "modul",
          "need",
          "new",
          "object",
          "outgo",
          "react",
          "send",
          "simpli",
          "simplifi",
          "us",
          "version",
          "web",
          "webmidi",
          "webmidi.j",
          "work"
        ],
        "WebMidi.html#enabled": [
          "access",
          "activ",
          "boolean",
          "enabl",
          "host'",
          "indic",
          "lt;readonly&gt",
          "member",
          "midi",
          "subsystem",
          "webmidi#en",
          "whether"
        ],
        "WebMidi.html#inputs": [
          "array",
          "avail",
          "current",
          "input",
          "lt;readonly&gt",
          "member",
          "midi",
          "webmidi#input"
        ],
        "WebMidi.html#interface": [
          "api",
          "directli",
          "do",
          "instanc",
          "interfac",
          "know",
          "lt;readonli",
          "member",
          "midi",
          "midiaccess",
          "nullable&gt",
          "talk",
          "unless",
          "us",
          "web",
          "webmidi#interfac"
        ],
        "WebMidi.html#MIDI_CHANNEL_MESSAGES": [
          "associ",
          "channel",
          "deprec",
          "enum",
          "lt;readonly&gt",
          "member",
          "messag",
          "midi",
          "midi_channel_messag",
          "midi_channel_voice_messag",
          "note",
          "now",
          "number&gt",
          "numer",
          "object.&lt;str",
          "us",
          "v3.0",
          "valu",
          "voic",
          "webmidi#midi_channel_messag"
        ],
        "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": [
          "120",
          "121",
          "122",
          "123",
          "124",
          "125",
          "126",
          "127",
          "allnotesoff",
          "allsoundoff",
          "associ",
          "channel",
          "enum",
          "localcontrol",
          "lt;readonly&gt",
          "member",
          "messag",
          "midi_channel_mode_messag",
          "mode",
          "monomodeon",
          "number&gt",
          "numer",
          "object.&lt;str",
          "omnimodeoff",
          "omnimodeon",
          "polymodeon",
          "resetallcontrol",
          "valu",
          "webmidi#midi_channel_mode_messag"
        ],
        "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": [
          "0x8",
          "0x9",
          "0xa",
          "0xb",
          "0xc",
          "0xd",
          "0xe",
          "10",
          "11",
          "12",
          "13",
          "14",
          "8",
          "9",
          "associ",
          "channel",
          "channelaftertouch",
          "channelmod",
          "controlchang",
          "enum",
          "keyaftertouch",
          "lt;readonly&gt",
          "member",
          "messag",
          "midi",
          "midi_channel_voice_messag",
          "noteoff",
          "noteon",
          "nrpn",
          "number&gt",
          "numer",
          "object.&lt;str",
          "pitchbend",
          "programchang",
          "valu",
          "voic",
          "webmidi#midi_channel_voice_messag"
        ],
        "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": [
          "0",
          "1",
          "10",
          "100",
          "101",
          "11",
          "12",
          "13",
          "16",
          "17",
          "18",
          "19",
          "2",
          "32",
          "33",
          "34",
          "36",
          "37",
          "38",
          "39",
          "4",
          "40",
          "42",
          "43",
          "44",
          "45",
          "5",
          "6",
          "64",
          "65",
          "66",
          "67",
          "68",
          "69",
          "7",
          "70",
          "71",
          "72",
          "73",
          "74",
          "75",
          "76",
          "78",
          "79",
          "8",
          "80",
          "81",
          "82",
          "83",
          "91",
          "92",
          "93",
          "94",
          "95",
          "96",
          "97",
          "98",
          "99",
          "associ",
          "balancecoars",
          "balancefin",
          "bankselectcoars",
          "bankselectfin",
          "breathcontrollercoars",
          "breathcontrollerfin",
          "bright",
          "celestelevel",
          "chang",
          "choruslevel",
          "control",
          "databuttondecr",
          "databuttonincr",
          "dataentrycoars",
          "dataentryfin",
          "effectcontrol1coars",
          "effectcontrol1fin",
          "effectcontrol2coars",
          "effectcontrol2fin",
          "enum",
          "expressioncoars",
          "expressionfin",
          "footcontrollercoars",
          "footcontrollerfin",
          "generalpurposebutton1",
          "generalpurposebutton2",
          "generalpurposebutton3",
          "generalpurposebutton4",
          "generalpurposeslider1",
          "generalpurposeslider2",
          "generalpurposeslider3",
          "generalpurposeslider4",
          "hold2ped",
          "holdped",
          "legatoped",
          "lt;readonly&gt",
          "member",
          "messag",
          "midi_control_change_messag",
          "modulationwheelcoars",
          "modulationwheelfin",
          "nonregisteredparametercoars",
          "nonregisteredparameterfin",
          "number&gt",
          "numer",
          "object.&lt;str",
          "pancoars",
          "panfin",
          "phaserlevel",
          "portamento",
          "portamentotimecoars",
          "portamentotimefin",
          "registeredparametercoars",
          "registeredparameterfin",
          "reson",
          "reverblevel",
          "softped",
          "soundattacktim",
          "soundcontrol10",
          "soundcontrol6",
          "soundcontrol7",
          "soundcontrol8:`77",
          "soundcontrol9",
          "soundreleasetim",
          "soundvari",
          "sustenutoped",
          "tremololevel",
          "valu",
          "volumecoars",
          "volumefin",
          "webmidi#midi_control_change_messag"
        ],
        "WebMidi.html#MIDI_INTERFACE_EVENTS": [
          "array",
          "array.&lt;string&gt",
          "event",
          "interfac",
          "level",
          "lt;readonly&gt",
          "member",
          "midi_interface_ev",
          "trigger",
          "valid",
          "webmidi#midi_interface_ev"
        ],
        "WebMidi.html#MIDI_NRPN_MESSAGES": [
          "127",
          "38",
          "6",
          "96",
          "97",
          "98",
          "99",
          "associ",
          "chang",
          "control",
          "creat",
          "decrement",
          "entrylsb",
          "entrymsb",
          "enum",
          "increment",
          "lt;readonly&gt",
          "member",
          "messag",
          "midi_nrpn_messag",
          "nrpn",
          "nullactiveparamet",
          "number&gt",
          "numer",
          "object.&lt;str",
          "paramlsb",
          "parammsb",
          "us",
          "valu",
          "webmidi#midi_nrpn_messag"
        ],
        "WebMidi.html#MIDI_REGISTERED_PARAMETER": [
          "0x00",
          "0x01",
          "0x02",
          "0x03",
          "0x04",
          "0x05",
          "0x06",
          "0x07",
          "0x08",
          "0x3d",
          "associ",
          "azimuthangl",
          "chang",
          "channelcoarsetun",
          "channelfinetun",
          "control",
          "current",
          "distanceratio",
          "elevationangl",
          "enum",
          "extend",
          "gain",
          "limit",
          "list",
          "lt;readonly&gt",
          "maximumdist",
          "maximumdistancegain",
          "member",
          "messag",
          "midi",
          "midi_registered_paramet",
          "modulationrang",
          "number",
          "number&gt",
          "numer",
          "object.&lt;str",
          "origin",
          "pair",
          "panspreadangl",
          "paramet",
          "pitchbendrang",
          "referencedistanceratio",
          "regist",
          "rollangl",
          "tuningbank",
          "tuningprogram",
          "valu",
          "webmidi#midi_registered_paramet"
        ],
        "WebMidi.html#MIDI_SYSTEM_MESSAGES": [
          "0",
          "0xf0",
          "0xf1",
          "0xf2",
          "0xf3",
          "0xf6",
          "0xf7",
          "0xf8",
          "0xfa",
          "0xfb",
          "0xfc",
          "0xfe",
          "0xff",
          "1",
          "1.0",
          "240",
          "241",
          "242",
          "243",
          "246",
          "247",
          "248",
          "249",
          "250",
          "251",
          "252",
          "253",
          "254",
          "255",
          "activesens",
          "actual",
          "api",
          "clock",
          "common",
          "continu",
          "custom",
          "end",
          "enum",
          "lt;readonly&gt",
          "match",
          "member",
          "messag",
          "midi",
          "midi_system_messag",
          "midimessag",
          "never",
          "number&gt",
          "numer",
          "object.&lt;str",
          "purpos",
          "real",
          "receiv",
          "relay",
          "reset",
          "serv",
          "simpli",
          "songposit",
          "songselect",
          "spec",
          "specif",
          "start",
          "state",
          "stop",
          "stream",
          "sysex",
          "sysexend",
          "system",
          "time",
          "timecod",
          "tuningrequest",
          "two",
          "undefined/reserv",
          "unknownsystemmessag",
          "us",
          "valid",
          "valu",
          "web",
          "webmidi#midi_system_messag",
          "webmidi.j"
        ],
        "WebMidi.html#NOTES": [
          "array",
          "array.&lt;string&gt",
          "lt;readonly&gt",
          "member",
          "name",
          "note",
          "standard",
          "webmidi#not"
        ],
        "WebMidi.html#octaveOffset": [
          "1",
          "2",
          "4th",
          "60",
          "both",
          "c",
          "c3",
          "c4",
          "c6",
          "default",
          "exampl",
          "inbound",
          "integ",
          "member",
          "messag",
          "middl",
          "midi",
          "note",
          "number",
          "octav",
          "octaveoffset",
          "offset",
          "outbound",
          "place",
          "report",
          "set",
          "webmidi#octaveoffset"
        ],
        "WebMidi.html#outputs": [
          "array",
          "avail",
          "current",
          "lt;readonly&gt",
          "member",
          "midi",
          "output",
          "webmidi#output"
        ],
        "WebMidi.html#supported": [
          "actual",
          "api",
          "avail",
          "boolean",
          "built",
          "environ",
          "even",
          "exampl",
          "function",
          "indic",
          "instal",
          "lt;readonly&gt",
          "member",
          "midi",
          "navigator.requestmidiaccess",
          "note",
          "offer",
          "plugin",
          "properti",
          "provid",
          "report",
          "support",
          "though",
          "true",
          "web",
          "webmidi#support",
          "webmidiapishim.j",
          "whether"
        ],
        "WebMidi.html#sysexEnabled": [
          "activ",
          "boolean",
          "enabl",
          "exclus",
          "indic",
          "lt;readonly&gt",
          "member",
          "messag",
          "method",
          "midi",
          "sysexen",
          "system",
          "via",
          "webmidi#sysexen",
          "webmidi.j",
          "whether"
        ],
        "WebMidi.html#time": [
          "5",
          "accord",
          "accur",
          "accuraci",
          "be",
          "browser",
          "constraint",
          "domhighrestimestamp",
          "due",
          "elaps",
          "float",
          "load",
          "lt;readonly&gt",
          "member",
          "microsecond",
          "millisecond",
          "number",
          "on",
          "origin",
          "page",
          "pass",
          "point",
          "s",
          "simpli",
          "specif",
          "sub",
          "time",
          "variou",
          "webmidi#tim"
        ],
        "WebMidi.html#convertToTimestamp": [
          "0",
          "calcul",
          "converttotimestamp",
          "current",
          "deriv",
          "document",
          "fals",
          "follow",
          "function",
          "invalid",
          "less",
          "navig",
          "number",
          "otherwis",
          "paramet",
          "plu",
          "rel",
          "result",
          "return",
          "sign",
          "start",
          "string",
          "sum",
          "time",
          "timestamp",
          "valu",
          "webmidi#converttotimestamp",
          "zero"
        ],
        "WebMidi.html#disable": [
          "ad",
          "avail",
          "complet",
          "destroy",
          "disabl",
          "function",
          "input",
          "interfac",
          "itself",
          "listen",
          "lt;async&gt",
          "mean",
          "midi",
          "object",
          "output",
          "promise.&lt;void&gt",
          "subsystem'",
          "unlink",
          "webmidi",
          "webmidi#dis",
          "webmidi.j"
        ],
        "WebMidi.html#enable": [
          "2020",
          "3",
          "access",
          "alway",
          "api",
          "april",
          "array",
          "asynchron",
          "author",
          "avail",
          "browser",
          "callback",
          "caus",
          "check",
          "chrome",
          "code",
          "confirm",
          "connect",
          "console.log(\"input",
          "console.log(\"output",
          "console.log(\"webmidi.j",
          "contain",
          "current",
          "display",
          "e",
          "e.g",
          "enabl",
          "end",
          "environ",
          "event",
          "exampl",
          "exclus",
          "execut",
          "file",
          "fulfil",
          "function",
          "futur",
          "gt",
          "happen",
          "host",
          "host'",
          "http",
          "ignor",
          "implement",
          "import",
          "input",
          "jazz",
          "librari",
          "listen",
          "localhost",
          "lt;async&gt",
          "matter",
          "messag",
          "midi",
          "note",
          "object",
          "oper",
          "option",
          "order",
          "origin",
          "output",
          "page",
          "pass",
          "plugin",
          "ports.input",
          "ports.output",
          "process",
          "promis",
          "promise.&lt;object&gt",
          "prompt",
          "proof",
          "properti",
          "resolv",
          "respect",
          "secur",
          "set",
          "softwar",
          "start",
          "subsystem",
          "support",
          "synth",
          "synthes",
          "sysex",
          "sysexen",
          "system",
          "toward",
          "tri",
          "trigger",
          "true",
          "two",
          "under",
          "us",
          "user",
          "v77",
          "wait",
          "way",
          "web",
          "webmidi",
          "webmidi#en",
          "webmidi.addlistener(\"en",
          "webmidi.en",
          "webmidi.enable().then(port",
          "webmidi.enable({callback"
        ],
        "WebMidi.html#getInputById": [
          "anoth",
          "api",
          "chang",
          "chrome",
          "exampl",
          "fals",
          "found",
          "function",
          "getinputbyid",
          "host",
          "id",
          "input",
          "input|fals",
          "integ",
          "jazz",
          "kind",
          "match",
          "midi",
          "note",
          "object",
          "on",
          "per",
          "pleas",
          "plugin",
          "return",
          "same",
          "specif",
          "specifi",
          "string",
          "us",
          "web",
          "webmidi#getinputbyid"
        ],
        "WebMidi.html#getInputByName": [
          "anoth",
          "chang",
          "chrome",
          "contain",
          "environ",
          "exampl",
          "first",
          "function",
          "getinputbynam",
          "input",
          "input|fals",
          "jazz",
          "name",
          "note",
          "object",
          "on",
          "plugin",
          "port",
          "report",
          "return",
          "same",
          "specifi",
          "string",
          "way",
          "webmidi#getinputbynam",
          "whose"
        ],
        "WebMidi.html#getNoteNumberByName": [
          "1",
          "2",
          "36",
          "60",
          "abb4",
          "b",
          "b##6",
          "bb",
          "c",
          "c4",
          "c5",
          "consid",
          "convert",
          "d",
          "doubl",
          "eb",
          "error",
          "etc",
          "exampl",
          "f0",
          "fals",
          "flat",
          "form",
          "function",
          "g4",
          "gb7",
          "getnotenumberbynam",
          "includ",
          "instead",
          "match",
          "middl",
          "midi",
          "name",
          "notat",
          "note",
          "number",
          "number|fals",
          "octav",
          "octaveoffset",
          "offset",
          "option",
          "paramet",
          "pars",
          "pass",
          "per",
          "pitch",
          "result",
          "return",
          "scientif",
          "sharp",
          "standard",
          "string",
          "symbol",
          "throw",
          "v3.x",
          "valid",
          "valu",
          "webmidi#getnotenumberbynam",
          "zero"
        ],
        "WebMidi.html#getOctave": [
          "0",
          "127",
          "4th",
          "60",
          "base",
          "be",
          "c",
          "c4",
          "default",
          "desir",
          "fals",
          "function",
          "getoctav",
          "instead",
          "method",
          "middl",
          "midi",
          "note",
          "number",
          "number|fals",
          "octav",
          "octaveoffset",
          "offset",
          "pars",
          "place",
          "properti",
          "result",
          "return",
          "specifi",
          "undefin",
          "us",
          "v3.x",
          "valid",
          "valu",
          "webmidi#getoctav"
        ],
        "WebMidi.html#getOutputById": [
          "anoth",
          "api",
          "chang",
          "chrome",
          "exampl",
          "fals",
          "found",
          "function",
          "getoutputbyid",
          "host",
          "id",
          "integ",
          "jazz",
          "kind",
          "match",
          "midi",
          "note",
          "object",
          "on",
          "output",
          "output|fals",
          "per",
          "pleas",
          "plugin",
          "return",
          "same",
          "specif",
          "specifi",
          "string",
          "us",
          "web",
          "webmidi#getoutputbyid"
        ],
        "WebMidi.html#getOutputByName": [
          "anoth",
          "chang",
          "chrome",
          "contain",
          "environ",
          "exampl",
          "first",
          "function",
          "getoutputbynam",
          "input",
          "jazz",
          "name",
          "note",
          "object",
          "on",
          "output",
          "output|fals",
          "plugin",
          "port",
          "report",
          "return",
          "same",
          "specifi",
          "string",
          "way",
          "webmidi#getoutputbynam",
          "whose"
        ],
        "WebMidi.html#guessNoteNumber": [
          "0",
          "127",
          "2",
          "between",
          "c3",
          "contain",
          "conveni",
          "d",
          "error",
          "etc",
          "f#4",
          "fals",
          "function",
          "g8",
          "given",
          "guessnotenumb",
          "input",
          "instead",
          "integ",
          "invalid",
          "method",
          "midi",
          "name",
          "note",
          "number",
          "number|fals",
          "paramet",
          "pass",
          "return",
          "simpli",
          "specifi",
          "string",
          "throw",
          "usual",
          "v3.x",
          "valid",
          "webmidi#guessnotenumb"
        ],
        "WebMidi.html#sanitizeChannels": [
          "1",
          "16",
          "array",
          "be",
          "between",
          "channel",
          "empti",
          "follow",
          "function",
          "ignor",
          "integ",
          "midi",
          "none",
          "note",
          "number",
          "on",
          "paramet",
          "pars",
          "pass",
          "result",
          "return",
          "sanit",
          "sanitizechannel",
          "silent",
          "singl",
          "special",
          "successfulli",
          "undefin",
          "valid",
          "valu",
          "webmidi#sanitizechannel"
        ]
      },
      "length": 83
    },
    "tokenStore": {
      "root": {
        "0": {
          "docs": {
            "Output.html#sendControlChange": {
              "ref": "Output.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "Output.html#sendSongPosition": {
              "ref": "Output.html#sendSongPosition",
              "tf": 5.263157894736842
            },
            "Output.html#sendSongSelect": {
              "ref": "Output.html#sendSongSelect",
              "tf": 3.571428571428571
            },
            "Output.html#sendStart": {
              "ref": "Output.html#sendStart",
              "tf": 2.380952380952381
            },
            "Output.html#setRegisteredParameter": {
              "ref": "Output.html#setRegisteredParameter",
              "tf": 0.3184713375796179
            },
            "OutputChannel.html#sendControlChange": {
              "ref": "OutputChannel.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
              "tf": 0.4032258064516129
            },
            "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
              "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
              "tf": 0.5617977528089888
            },
            "WebMidi.html#convertToTimestamp": {
              "ref": "WebMidi.html#convertToTimestamp",
              "tf": 1.3888888888888888
            },
            "WebMidi.html#getOctave": {
              "ref": "WebMidi.html#getOctave",
              "tf": 1.282051282051282
            },
            "WebMidi.html#guessNoteNumber": {
              "ref": "WebMidi.html#guessNoteNumber",
              "tf": 2.5
            }
          },
          "x": {
            "0": {
              "0": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 2.547770700636943
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 6.25
                  }
                }
              },
              "1": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.6369426751592357
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 1.5625
                  }
                }
              },
              "2": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.6369426751592357
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 1.5625
                  }
                }
              },
              "3": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.6369426751592357
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 1.5625
                  }
                }
              },
              "4": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.6369426751592357
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 1.5625
                  }
                }
              },
              "5": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.6369426751592357
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 1.5625
                  }
                }
              },
              "6": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 0.78125
                  }
                }
              },
              "7": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 0.78125
                  }
                }
              },
              "8": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 0.78125
                  }
                }
              },
              "9": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  }
                }
              },
              "docs": {}
            },
            "1": {
              "docs": {
                "Output.html#sendSysex": {
                  "ref": "Output.html#sendSysex",
                  "tf": 0.6666666666666667
                }
              }
            },
            "2": {
              "1": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  }
                }
              },
              "docs": {
                "Output.html#sendSysex": {
                  "ref": "Output.html#sendSysex",
                  "tf": 0.6666666666666667
                }
              }
            },
            "3": {
              "docs": {
                "Output.html#sendSysex": {
                  "ref": "Output.html#sendSysex",
                  "tf": 0.6666666666666667
                }
              },
              "d": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 2.8662420382165608
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 7.03125
                  }
                }
              }
            },
            "4": {
              "docs": {
                "Output.html#sendSysex": {
                  "ref": "Output.html#sendSysex",
                  "tf": 0.6666666666666667
                }
              }
            },
            "5": {
              "docs": {
                "Output.html#sendSysex": {
                  "ref": "Output.html#sendSysex",
                  "tf": 0.6666666666666667
                }
              }
            },
            "8": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                  "tf": 1.4285714285714286
                }
              }
            },
            "9": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                  "tf": 1.4285714285714286
                }
              }
            },
            "docs": {},
            "f": {
              "0": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  },
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              },
              "1": {
                "docs": {
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              },
              "2": {
                "docs": {
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              },
              "3": {
                "docs": {
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              },
              "6": {
                "docs": {
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              },
              "7": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  },
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              },
              "8": {
                "docs": {
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              },
              "docs": {},
              "a": {
                "docs": {
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              },
              "b": {
                "docs": {
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              },
              "c": {
                "docs": {
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              },
              "e": {
                "docs": {
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              },
              "f": {
                "docs": {
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              }
            },
            "a": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                  "tf": 1.4285714285714286
                }
              }
            },
            "b": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                  "tf": 4.285714285714286
                }
              }
            },
            "c": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                  "tf": 1.4285714285714286
                }
              }
            },
            "d": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                  "tf": 1.4285714285714286
                }
              }
            },
            "e": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                  "tf": 1.4285714285714286
                }
              }
            }
          }
        },
        "1": {
          "0": {
            "0": {
              "docs": {
                "Output.html#sendControlChange": {
                  "ref": "Output.html#sendControlChange",
                  "tf": 0.2890173410404624
                },
                "OutputChannel.html#sendControlChange": {
                  "ref": "OutputChannel.html#sendControlChange",
                  "tf": 0.2890173410404624
                },
                "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                  "tf": 0.4032258064516129
                }
              }
            },
            "1": {
              "docs": {
                "Output.html#sendControlChange": {
                  "ref": "Output.html#sendControlChange",
                  "tf": 0.2890173410404624
                },
                "OutputChannel.html#sendControlChange": {
                  "ref": "OutputChannel.html#sendControlChange",
                  "tf": 0.2890173410404624
                },
                "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                  "tf": 0.4032258064516129
                }
              }
            },
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                "tf": 1.4285714285714286
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "1": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                "tf": 4.285714285714286
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "2": {
            "0": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                  "tf": 2.1739130434782608
                }
              }
            },
            "1": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                  "tf": 2.1739130434782608
                }
              }
            },
            "2": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                  "tf": 2.1739130434782608
                }
              }
            },
            "3": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                  "tf": 2.1739130434782608
                }
              }
            },
            "4": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                  "tf": 2.1739130434782608
                }
              }
            },
            "5": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                  "tf": 2.1739130434782608
                }
              }
            },
            "6": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                  "tf": 2.1739130434782608
                }
              }
            },
            "7": {
              "docs": {
                "Output.html#setRegisteredParameter": {
                  "ref": "Output.html#setRegisteredParameter",
                  "tf": 0.3184713375796179
                },
                "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                  "tf": 2.1739130434782608
                },
                "WebMidi.html#MIDI_NRPN_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                  "tf": 2
                },
                "WebMidi.html#getOctave": {
                  "ref": "WebMidi.html#getOctave",
                  "tf": 1.282051282051282
                },
                "WebMidi.html#guessNoteNumber": {
                  "ref": "WebMidi.html#guessNoteNumber",
                  "tf": 2.5
                }
              }
            },
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                "tf": 1.4285714285714286
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "3": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                "tf": 1.4285714285714286
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "4": {
            "docs": {
              "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                "tf": 1.4285714285714286
              }
            }
          },
          "6": {
            "3": {
              "8": {
                "3": {
                  "docs": {
                    "Output.html#sendSongPosition": {
                      "ref": "Output.html#sendSongPosition",
                      "tf": 2.631578947368421
                    }
                  }
                },
                "docs": {}
              },
              "docs": {}
            },
            "docs": {
              "InputChannel.html#number": {
                "ref": "InputChannel.html#number",
                "tf": 12.5
              },
              "Output.html#channels": {
                "ref": "Output.html#channels",
                "tf": 11.11111111111111
              },
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#number": {
                "ref": "OutputChannel.html#number",
                "tf": 12.5
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              },
              "WebMidi.html#sanitizeChannels": {
                "ref": "WebMidi.html#sanitizeChannels",
                "tf": 3.061224489795918
              }
            },
            "t": {
              "docs": {},
              "h": {
                "docs": {
                  "Output.html#sendSongPosition": {
                    "ref": "Output.html#sendSongPosition",
                    "tf": 2.631578947368421
                  }
                }
              }
            }
          },
          "7": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "8": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "9": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "docs": {
            "InputChannel.html#number": {
              "ref": "InputChannel.html#number",
              "tf": 12.5
            },
            "Output.html#channels": {
              "ref": "Output.html#channels",
              "tf": 5.555555555555555
            },
            "Output.html#sendControlChange": {
              "ref": "Output.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "Output.html#sendSongSelect": {
              "ref": "Output.html#sendSongSelect",
              "tf": 3.571428571428571
            },
            "Output.html#sendSysex": {
              "ref": "Output.html#sendSysex",
              "tf": 0.6666666666666667
            },
            "OutputChannel.html#number": {
              "ref": "OutputChannel.html#number",
              "tf": 12.5
            },
            "OutputChannel.html#sendControlChange": {
              "ref": "OutputChannel.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
              "tf": 0.4032258064516129
            },
            "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
              "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
              "tf": 0.5617977528089888
            },
            "WebMidi.html#octaveOffset": {
              "ref": "WebMidi.html#octaveOffset",
              "tf": 1.3513513513513513
            },
            "WebMidi.html#getNoteNumberByName": {
              "ref": "WebMidi.html#getNoteNumberByName",
              "tf": 1.1363636363636365
            },
            "WebMidi.html#sanitizeChannels": {
              "ref": "WebMidi.html#sanitizeChannels",
              "tf": 3.061224489795918
            }
          },
          ".": {
            "0": {
              "docs": {
                "Output.html#setRegisteredParameter": {
                  "ref": "Output.html#setRegisteredParameter",
                  "tf": 0.3184713375796179
                },
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "docs": {}
          }
        },
        "2": {
          "0": {
            "2": {
              "0": {
                "docs": {
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.2857142857142857
                  }
                }
              },
              "docs": {}
            },
            "docs": {}
          },
          "4": {
            "0": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "1": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "2": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "3": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "6": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "7": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "8": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "9": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "docs": {
              "Output.html#sendClock": {
                "ref": "Output.html#sendClock",
                "tf": 3.8461538461538463
              }
            }
          },
          "5": {
            "0": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "1": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "2": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "3": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "4": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "5": {
              "docs": {
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                }
              }
            },
            "docs": {}
          },
          "docs": {
            "Output.html#sendControlChange": {
              "ref": "Output.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "Output.html#sendSysex": {
              "ref": "Output.html#sendSysex",
              "tf": 0.6666666666666667
            },
            "OutputChannel.html#sendControlChange": {
              "ref": "OutputChannel.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
              "tf": 0.4032258064516129
            },
            "WebMidi.html#octaveOffset": {
              "ref": "WebMidi.html#octaveOffset",
              "tf": 1.3513513513513513
            },
            "WebMidi.html#getNoteNumberByName": {
              "ref": "WebMidi.html#getNoteNumberByName",
              "tf": 0.5681818181818182
            },
            "WebMidi.html#guessNoteNumber": {
              "ref": "WebMidi.html#guessNoteNumber",
              "tf": 1.25
            }
          }
        },
        "3": {
          "0": {
            "0": {
              "docs": {
                "Output.html#sendActiveSensing": {
                  "ref": "Output.html#sendActiveSensing",
                  "tf": 2.272727272727273
                }
              }
            },
            "docs": {}
          },
          "2": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "3": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "4": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "6": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              },
              "WebMidi.html#getNoteNumberByName": {
                "ref": "WebMidi.html#getNoteNumberByName",
                "tf": 0.5681818181818182
              }
            }
          },
          "7": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "8": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              },
              "WebMidi.html#MIDI_NRPN_MESSAGES": {
                "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                "tf": 2
              }
            }
          },
          "9": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "docs": {
            "Output.html#sendControlChange": {
              "ref": "Output.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "Output.html#sendSysex": {
              "ref": "Output.html#sendSysex",
              "tf": 1.3333333333333335
            },
            "OutputChannel.html#sendControlChange": {
              "ref": "OutputChannel.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "WebMidi.html#enable": {
              "ref": "WebMidi.html#enable",
              "tf": 0.2857142857142857
            }
          },
          "d": {
            "docs": {
              "Output.html#setRegisteredParameter": {
                "ref": "Output.html#setRegisteredParameter",
                "tf": 0.3184713375796179
              }
            }
          }
        },
        "4": {
          "0": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "2": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "Output.html#sendSysex": {
                "ref": "Output.html#sendSysex",
                "tf": 0.33333333333333337
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "3": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "4": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "5": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "docs": {
            "Output.html#sendControlChange": {
              "ref": "Output.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "Output.html#sendSysex": {
              "ref": "Output.html#sendSysex",
              "tf": 0.6666666666666667
            },
            "OutputChannel.html#sendControlChange": {
              "ref": "OutputChannel.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
              "tf": 0.4032258064516129
            }
          },
          "t": {
            "docs": {},
            "h": {
              "docs": {
                "WebMidi.html#octaveOffset": {
                  "ref": "WebMidi.html#octaveOffset",
                  "tf": 1.3513513513513513
                },
                "WebMidi.html#getOctave": {
                  "ref": "WebMidi.html#getOctave",
                  "tf": 1.282051282051282
                }
              }
            }
          }
        },
        "5": {
          "docs": {
            "Output.html#sendControlChange": {
              "ref": "Output.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "Output.html#sendSysex": {
              "ref": "Output.html#sendSysex",
              "tf": 0.6666666666666667
            },
            "OutputChannel.html#sendControlChange": {
              "ref": "OutputChannel.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
              "tf": 0.4032258064516129
            },
            "WebMidi.html#time": {
              "ref": "WebMidi.html#time",
              "tf": 1.5625
            }
          }
        },
        "6": {
          "0": {
            "docs": {
              "WebMidi.html#octaveOffset": {
                "ref": "WebMidi.html#octaveOffset",
                "tf": 4.054054054054054
              },
              "WebMidi.html#getNoteNumberByName": {
                "ref": "WebMidi.html#getNoteNumberByName",
                "tf": 0.5681818181818182
              },
              "WebMidi.html#getOctave": {
                "ref": "WebMidi.html#getOctave",
                "tf": 1.282051282051282
              }
            }
          },
          "4": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            },
            "k": {
              "docs": {},
              "b": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  }
                }
              }
            }
          },
          "5": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "6": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "Output.html#sendSysex": {
                "ref": "Output.html#sendSysex",
                "tf": 0.33333333333333337
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "7": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "8": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "9": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "docs": {
            "Output.html#sendControlChange": {
              "ref": "Output.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "OutputChannel.html#sendControlChange": {
              "ref": "OutputChannel.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
              "tf": 0.4032258064516129
            },
            "WebMidi.html#MIDI_NRPN_MESSAGES": {
              "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
              "tf": 2
            }
          }
        },
        "7": {
          "0": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "1": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "2": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "3": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "4": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "5": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "6": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "7": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              }
            }
          },
          "8": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "9": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "docs": {
            "Output.html#sendControlChange": {
              "ref": "Output.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "OutputChannel.html#sendControlChange": {
              "ref": "OutputChannel.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
              "tf": 0.4032258064516129
            }
          }
        },
        "8": {
          "0": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "1": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "2": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "3": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "docs": {
            "Output.html#sendControlChange": {
              "ref": "Output.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "OutputChannel.html#sendControlChange": {
              "ref": "OutputChannel.html#sendControlChange",
              "tf": 0.2890173410404624
            },
            "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
              "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
              "tf": 1.4285714285714286
            },
            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
              "tf": 0.4032258064516129
            }
          }
        },
        "9": {
          "1": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "2": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "3": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "4": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "5": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              }
            }
          },
          "6": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              },
              "WebMidi.html#MIDI_NRPN_MESSAGES": {
                "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                "tf": 2
              }
            }
          },
          "7": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              },
              "WebMidi.html#MIDI_NRPN_MESSAGES": {
                "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                "tf": 2
              }
            }
          },
          "8": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              },
              "WebMidi.html#MIDI_NRPN_MESSAGES": {
                "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                "tf": 2
              }
            }
          },
          "9": {
            "docs": {
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                "tf": 0.4032258064516129
              },
              "WebMidi.html#MIDI_NRPN_MESSAGES": {
                "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                "tf": 2
              }
            }
          },
          "docs": {
            "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
              "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
              "tf": 1.4285714285714286
            }
          }
        },
        "docs": {},
        "a": {
          "docs": {},
          "p": {
            "docs": {},
            "i": {
              "docs": {
                "index.html": {
                  "ref": "index.html",
                  "tf": 10
                },
                "WebMidi.html": {
                  "ref": "WebMidi.html",
                  "tf": 0.8620689655172413
                },
                "WebMidi.html#interface": {
                  "ref": "WebMidi.html#interface",
                  "tf": 4.166666666666666
                },
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                },
                "WebMidi.html#supported": {
                  "ref": "WebMidi.html#supported",
                  "tf": 1.7241379310344827
                },
                "WebMidi.html#enable": {
                  "ref": "WebMidi.html#enable",
                  "tf": 0.5714285714285714
                },
                "WebMidi.html#getInputById": {
                  "ref": "WebMidi.html#getInputById",
                  "tf": 1.4705882352941175
                },
                "WebMidi.html#getOutputById": {
                  "ref": "WebMidi.html#getOutputById",
                  "tf": 1.4705882352941175
                }
              }
            },
            "r": {
              "docs": {},
              "i": {
                "docs": {},
                "l": {
                  "docs": {
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.2857142857142857
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "r": {
              "docs": {},
              "a": {
                "docs": {},
                "y": {
                  "docs": {
                    "Input.html": {
                      "ref": "Input.html",
                      "tf": 2.083333333333333
                    },
                    "Input.html#.NRPN_TYPES": {
                      "ref": "Input.html#.NRPN_TYPES",
                      "tf": 6.25
                    },
                    "Output.html": {
                      "ref": "Output.html",
                      "tf": 2.083333333333333
                    },
                    "Output.html#channels": {
                      "ref": "Output.html#channels",
                      "tf": 5.555555555555555
                    },
                    "Output.html#sendSysex": {
                      "ref": "Output.html#sendSysex",
                      "tf": 0.6666666666666667
                    },
                    "WebMidi.html#inputs": {
                      "ref": "WebMidi.html#inputs",
                      "tf": 43.33333333333333
                    },
                    "WebMidi.html#MIDI_INTERFACE_EVENTS": {
                      "ref": "WebMidi.html#MIDI_INTERFACE_EVENTS",
                      "tf": 8.333333333333332
                    },
                    "WebMidi.html#NOTES": {
                      "ref": "WebMidi.html#NOTES",
                      "tf": 12.5
                    },
                    "WebMidi.html#outputs": {
                      "ref": "WebMidi.html#outputs",
                      "tf": 43.33333333333333
                    },
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.2857142857142857
                    },
                    "WebMidi.html#sanitizeChannels": {
                      "ref": "WebMidi.html#sanitizeChannels",
                      "tf": 36.39455782312925
                    }
                  },
                  ".": {
                    "docs": {},
                    "&": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          ";": {
                            "docs": {},
                            "s": {
                              "docs": {},
                              "t": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "n": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "&": {
                                          "docs": {},
                                          "g": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "Input.html#.NRPN_TYPES": {
                                                  "ref": "Input.html#.NRPN_TYPES",
                                                  "tf": 25
                                                },
                                                "WebMidi.html#MIDI_INTERFACE_EVENTS": {
                                                  "ref": "WebMidi.html#MIDI_INTERFACE_EVENTS",
                                                  "tf": 33.33333333333333
                                                },
                                                "WebMidi.html#NOTES": {
                                                  "ref": "WebMidi.html#NOTES",
                                                  "tf": 33.33333333333333
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "o": {
                              "docs": {},
                              "u": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "p": {
                                    "docs": {},
                                    "u": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "c": {
                                          "docs": {},
                                          "h": {
                                            "docs": {},
                                            "a": {
                                              "docs": {},
                                              "n": {
                                                "docs": {},
                                                "n": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "l": {
                                                      "docs": {},
                                                      "&": {
                                                        "docs": {},
                                                        "g": {
                                                          "docs": {},
                                                          "t": {
                                                            "docs": {
                                                              "Output.html#channels": {
                                                                "ref": "Output.html#channels",
                                                                "tf": 50
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "v": {
            "docs": {},
            "a": {
              "docs": {},
              "i": {
                "docs": {},
                "l": {
                  "docs": {
                    "Input.html": {
                      "ref": "Input.html",
                      "tf": 2.083333333333333
                    },
                    "Input.html#manufacturer": {
                      "ref": "Input.html#manufacturer",
                      "tf": 7.142857142857142
                    },
                    "Output.html": {
                      "ref": "Output.html",
                      "tf": 2.083333333333333
                    },
                    "Output.html#channels": {
                      "ref": "Output.html#channels",
                      "tf": 5.555555555555555
                    },
                    "Output.html#manufacturer": {
                      "ref": "Output.html#manufacturer",
                      "tf": 7.142857142857142
                    },
                    "Output.html#send": {
                      "ref": "Output.html#send",
                      "tf": 1.282051282051282
                    },
                    "Output.html#sendControlChange": {
                      "ref": "Output.html#sendControlChange",
                      "tf": 0.2890173410404624
                    },
                    "OutputChannel.html#send": {
                      "ref": "OutputChannel.html#send",
                      "tf": 1.4285714285714286
                    },
                    "OutputChannel.html#sendControlChange": {
                      "ref": "OutputChannel.html#sendControlChange",
                      "tf": 0.2890173410404624
                    },
                    "WebMidi.html#inputs": {
                      "ref": "WebMidi.html#inputs",
                      "tf": 10
                    },
                    "WebMidi.html#outputs": {
                      "ref": "WebMidi.html#outputs",
                      "tf": 10
                    },
                    "WebMidi.html#supported": {
                      "ref": "WebMidi.html#supported",
                      "tf": 1.7241379310344827
                    },
                    "WebMidi.html#disable": {
                      "ref": "WebMidi.html#disable",
                      "tf": 2.272727272727273
                    },
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 1.1428571428571428
                    }
                  }
                }
              }
            }
          },
          "s": {
            "docs": {},
            "s": {
              "docs": {},
              "o": {
                "docs": {},
                "c": {
                  "docs": {},
                  "i": {
                    "docs": {
                      "Output.html#send": {
                        "ref": "Output.html#send",
                        "tf": 1.282051282051282
                      },
                      "OutputChannel.html#send": {
                        "ref": "OutputChannel.html#send",
                        "tf": 1.4285714285714286
                      },
                      "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                        "tf": 3.571428571428571
                      },
                      "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                        "tf": 2.1739130434782608
                      },
                      "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                        "tf": 1.4285714285714286
                      },
                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                        "tf": 0.4032258064516129
                      },
                      "WebMidi.html#MIDI_NRPN_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                        "tf": 2
                      },
                      "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                        "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                        "tf": 0.78125
                      }
                    }
                  }
                }
              }
            },
            "y": {
              "docs": {},
              "n": {
                "docs": {},
                "c": {
                  "docs": {},
                  "h": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "n": {
                          "docs": {
                            "WebMidi.html#enable": {
                              "ref": "WebMidi.html#enable",
                              "tf": 0.2857142857142857
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "c": {
            "docs": {},
            "t": {
              "docs": {},
              "i": {
                "docs": {},
                "v": {
                  "docs": {
                    "Output.html#sendActiveSensing": {
                      "ref": "Output.html#sendActiveSensing",
                      "tf": 6.8181818181818175
                    },
                    "WebMidi.html#enabled": {
                      "ref": "WebMidi.html#enabled",
                      "tf": 7.142857142857142
                    },
                    "WebMidi.html#sysexEnabled": {
                      "ref": "WebMidi.html#sysexEnabled",
                      "tf": 4.166666666666666
                    }
                  },
                  "e": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "s": {
                            "docs": {
                              "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                                "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                                "tf": 0.5617977528089888
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "u": {
                "docs": {},
                "a": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                        "tf": 1.1235955056179776
                      },
                      "WebMidi.html#supported": {
                        "ref": "WebMidi.html#supported",
                        "tf": 1.7241379310344827
                      }
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "o": {
                "docs": {},
                "r": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "Output.html#sendClock": {
                        "ref": "Output.html#sendClock",
                        "tf": 3.8461538461538463
                      },
                      "Output.html#sendTimecodeQuarterFrame": {
                        "ref": "Output.html#sendTimecodeQuarterFrame",
                        "tf": 2.5
                      },
                      "WebMidi.html#time": {
                        "ref": "WebMidi.html#time",
                        "tf": 1.5625
                      }
                    }
                  }
                }
              },
              "e": {
                "docs": {},
                "s": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "WebMidi.html#enabled": {
                        "ref": "WebMidi.html#enabled",
                        "tf": 7.142857142857142
                      },
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.2857142857142857
                      }
                    }
                  }
                }
              },
              "u": {
                "docs": {},
                "r": {
                  "docs": {
                    "WebMidi.html#time": {
                      "ref": "WebMidi.html#time",
                      "tf": 3.125
                    }
                  },
                  "a": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "WebMidi.html#time": {
                            "ref": "WebMidi.html#time",
                            "tf": 1.5625
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "f": {
            "docs": {},
            "t": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "u": {
                        "docs": {},
                        "c": {
                          "docs": {},
                          "h": {
                            "docs": {
                              "Output.html#sendChannelAftertouch": {
                                "ref": "Output.html#sendChannelAftertouch",
                                "tf": 7.6923076923076925
                              },
                              "Output.html#sendKeyAftertouch": {
                                "ref": "Output.html#sendKeyAftertouch",
                                "tf": 8.333333333333332
                              },
                              "OutputChannel.html#sendKeyAftertouch": {
                                "ref": "OutputChannel.html#sendKeyAftertouch",
                                "tf": 9.375
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "b": {
            "docs": {},
            "o": {
              "docs": {},
              "v": {
                "docs": {
                  "Output.html#sendControlChange": {
                    "ref": "Output.html#sendControlChange",
                    "tf": 0.2890173410404624
                  },
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.6666666666666667
                  },
                  "OutputChannel.html#sendControlChange": {
                    "ref": "OutputChannel.html#sendControlChange",
                    "tf": 0.2890173410404624
                  }
                }
              }
            },
            "b": {
              "4": {
                "docs": {
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 0.5681818181818182
                  }
                }
              },
              "docs": {}
            }
          },
          "l": {
            "docs": {},
            "w": {
              "docs": {},
              "a": {
                "docs": {},
                "y": {
                  "docs": {
                    "Output.html#sendSongPosition": {
                      "ref": "Output.html#sendSongPosition",
                      "tf": 2.631578947368421
                    },
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.5714285714285714
                    }
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "e": {
                "docs": {},
                "a": {
                  "docs": {},
                  "d": {
                    "docs": {},
                    "i": {
                      "docs": {
                        "WebMidi.html": {
                          "ref": "WebMidi.html",
                          "tf": 1.7241379310344827
                        }
                      }
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "n": {
                "docs": {},
                "o": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "f": {
                            "docs": {},
                            "f": {
                              "docs": {
                                "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                                  "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                                  "tf": 2.1739130434782608
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "s": {
                "docs": {},
                "o": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "d": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "f": {
                            "docs": {},
                            "f": {
                              "docs": {
                                "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                                  "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                                  "tf": 2.1739130434782608
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "t": {
              "docs": {},
              "o": {
                "docs": {},
                "m": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Output.html#sendSysex": {
                          "ref": "Output.html#sendSysex",
                          "tf": 0.33333333333333337
                        }
                      }
                    }
                  }
                }
              },
              "h": {
                "docs": {},
                "o": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.2857142857142857
                      }
                    }
                  }
                }
              }
            }
          },
          "d": {
            "docs": {
              "Output.html#setRegisteredParameter": {
                "ref": "Output.html#setRegisteredParameter",
                "tf": 0.3184713375796179
              },
              "WebMidi.html#disable": {
                "ref": "WebMidi.html#disable",
                "tf": 2.272727272727273
              }
            },
            "j": {
              "docs": {},
              "u": {
                "docs": {},
                "s": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Output.html#setPitchBendRange": {
                        "ref": "Output.html#setPitchBendRange",
                        "tf": 1.7857142857142856
                      }
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "g": {
              "docs": {},
              "l": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 1.2738853503184715
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "t": {
                "docs": {},
                "h": {
                  "docs": {
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.3184713375796179
                    },
                    "WebMidi.html#getInputById": {
                      "ref": "WebMidi.html#getInputById",
                      "tf": 1.4705882352941175
                    },
                    "WebMidi.html#getInputByName": {
                      "ref": "WebMidi.html#getInputByName",
                      "tf": 2
                    },
                    "WebMidi.html#getOutputById": {
                      "ref": "WebMidi.html#getOutputById",
                      "tf": 1.4705882352941175
                    },
                    "WebMidi.html#getOutputByName": {
                      "ref": "WebMidi.html#getOutputByName",
                      "tf": 2
                    }
                  }
                }
              }
            }
          },
          "z": {
            "docs": {},
            "i": {
              "docs": {},
              "m": {
                "docs": {},
                "u": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "h": {
                      "docs": {
                        "Output.html#setRegisteredParameter": {
                          "ref": "Output.html#setRegisteredParameter",
                          "tf": 0.3184713375796179
                        }
                      },
                      "a": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "l": {
                              "docs": {
                                "Output.html#setRegisteredParameter": {
                                  "ref": "Output.html#setRegisteredParameter",
                                  "tf": 0.3184713375796179
                                },
                                "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                  "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                  "tf": 0.78125
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "h": {
          "docs": {},
          "e": {
            "docs": {},
            "l": {
              "docs": {},
              "p": {
                "docs": {
                  "index.html": {
                    "ref": "index.html",
                    "tf": 10
                  }
                },
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "Output.html#send": {
                        "ref": "Output.html#send",
                        "tf": 1.282051282051282
                      },
                      "OutputChannel.html#send": {
                        "ref": "OutputChannel.html#send",
                        "tf": 1.4285714285714286
                      }
                    }
                  }
                }
              }
            },
            "x": {
              "docs": {
                "Output.html#sendSysex": {
                  "ref": "Output.html#sendSysex",
                  "tf": 0.6666666666666667
                }
              }
            },
            "r": {
              "docs": {},
              "e": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {
                  "Input.html#id": {
                    "ref": "Input.html#id",
                    "tf": 2.1739130434782608
                  },
                  "Output.html#id": {
                    "ref": "Output.html#id",
                    "tf": 2.1739130434782608
                  },
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.5714285714285714
                  },
                  "WebMidi.html#getInputById": {
                    "ref": "WebMidi.html#getInputById",
                    "tf": 1.4705882352941175
                  },
                  "WebMidi.html#getOutputById": {
                    "ref": "WebMidi.html#getOutputById",
                    "tf": 1.4705882352941175
                  }
                },
                "'": {
                  "docs": {
                    "Input.html": {
                      "ref": "Input.html",
                      "tf": 2.083333333333333
                    },
                    "Output.html": {
                      "ref": "Output.html",
                      "tf": 2.083333333333333
                    },
                    "WebMidi.html#enabled": {
                      "ref": "WebMidi.html#enabled",
                      "tf": 7.142857142857142
                    },
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.2857142857142857
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "d": {
                "2": {
                  "docs": {},
                  "p": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "d": {
                        "docs": {
                          "Output.html#sendControlChange": {
                            "ref": "Output.html#sendControlChange",
                            "tf": 0.2890173410404624
                          },
                          "OutputChannel.html#sendControlChange": {
                            "ref": "OutputChannel.html#sendControlChange",
                            "tf": 0.2890173410404624
                          },
                          "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                            "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                            "tf": 0.4032258064516129
                          }
                        }
                      }
                    }
                  }
                },
                "docs": {},
                "p": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "Output.html#sendControlChange": {
                          "ref": "Output.html#sendControlChange",
                          "tf": 0.2890173410404624
                        },
                        "OutputChannel.html#sendControlChange": {
                          "ref": "OutputChannel.html#sendControlChange",
                          "tf": 0.2890173410404624
                        },
                        "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                          "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                          "tf": 0.4032258064516129
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            "t": {
              "docs": {},
              "p": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  },
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.2857142857142857
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "p": {
              "docs": {},
              "p": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.2857142857142857
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "i": {
          "docs": {},
          "n": {
            "docs": {},
            "d": {
              "docs": {},
              "e": {
                "docs": {},
                "x": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 1300
                    }
                  }
                }
              },
              "i": {
                "docs": {},
                "c": {
                  "docs": {
                    "Input.html#nrpnEventsEnabled": {
                      "ref": "Input.html#nrpnEventsEnabled",
                      "tf": 1.0869565217391304
                    },
                    "WebMidi.html#enabled": {
                      "ref": "WebMidi.html#enabled",
                      "tf": 7.142857142857142
                    },
                    "WebMidi.html#supported": {
                      "ref": "WebMidi.html#supported",
                      "tf": 1.7241379310344827
                    },
                    "WebMidi.html#sysexEnabled": {
                      "ref": "WebMidi.html#sysexEnabled",
                      "tf": 4.166666666666666
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "u": {
                "docs": {},
                "t": {
                  "docs": {
                    "Input.html": {
                      "ref": "Input.html",
                      "tf": 1906.25
                    },
                    "Input.html#connection": {
                      "ref": "Input.html#connection",
                      "tf": 7.142857142857142
                    },
                    "Input.html#manufacturer": {
                      "ref": "Input.html#manufacturer",
                      "tf": 7.142857142857142
                    },
                    "Input.html#name": {
                      "ref": "Input.html#name",
                      "tf": 16.666666666666664
                    },
                    "Input.html#nrpnEventsEnabled": {
                      "ref": "Input.html#nrpnEventsEnabled",
                      "tf": 1.0869565217391304
                    },
                    "Input.html#state": {
                      "ref": "Input.html#state",
                      "tf": 10
                    },
                    "Input.html#type": {
                      "ref": "Input.html#type",
                      "tf": 25
                    },
                    "Input.html#open": {
                      "ref": "Input.html#open",
                      "tf": 16.666666666666664
                    },
                    "WebMidi.html#inputs": {
                      "ref": "WebMidi.html#inputs",
                      "tf": 693.3333333333334
                    },
                    "WebMidi.html#disable": {
                      "ref": "WebMidi.html#disable",
                      "tf": 4.545454545454546
                    },
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.8571428571428572
                    },
                    "WebMidi.html#getInputById": {
                      "ref": "WebMidi.html#getInputById",
                      "tf": 2.941176470588235
                    },
                    "WebMidi.html#getInputByName": {
                      "ref": "WebMidi.html#getInputByName",
                      "tf": 4
                    },
                    "WebMidi.html#getOutputByName": {
                      "ref": "WebMidi.html#getOutputByName",
                      "tf": 2
                    },
                    "WebMidi.html#guessNoteNumber": {
                      "ref": "WebMidi.html#guessNoteNumber",
                      "tf": 35.83333333333333
                    }
                  },
                  ".": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "_": {
                              "docs": {},
                              "t": {
                                "docs": {},
                                "y": {
                                  "docs": {},
                                  "p": {
                                    "docs": {
                                      "Input.html#.NRPN_TYPES": {
                                        "ref": "Input.html#.NRPN_TYPES",
                                        "tf": 1150
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "#": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "c": {
                                "docs": {},
                                "t": {
                                  "docs": {
                                    "Input.html#connection": {
                                      "ref": "Input.html#connection",
                                      "tf": 1150
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "i": {
                      "docs": {},
                      "d": {
                        "docs": {
                          "Input.html#id": {
                            "ref": "Input.html#id",
                            "tf": 1150
                          }
                        }
                      }
                    },
                    "m": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "f": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "c": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "u": {
                                      "docs": {},
                                      "r": {
                                        "docs": {
                                          "Input.html#manufacturer": {
                                            "ref": "Input.html#manufacturer",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "n": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "m": {
                          "docs": {
                            "Input.html#name": {
                              "ref": "Input.html#name",
                              "tf": 1150
                            }
                          }
                        }
                      },
                      "r": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "v": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "n": {
                                            "docs": {
                                              "Input.html#nrpnEventsEnabled": {
                                                "ref": "Input.html#nrpnEventsEnabled",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "s": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "Input.html#state": {
                            "ref": "Input.html#state",
                            "tf": 1150
                          }
                        }
                      }
                    },
                    "t": {
                      "docs": {},
                      "y": {
                        "docs": {},
                        "p": {
                          "docs": {
                            "Input.html#type": {
                              "ref": "Input.html#type",
                              "tf": 1150
                            }
                          }
                        }
                      }
                    },
                    "d": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "y": {
                                  "docs": {
                                    "Input.html#destroy": {
                                      "ref": "Input.html#destroy",
                                      "tf": 1150
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "g": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "c": {
                            "docs": {},
                            "c": {
                              "docs": {},
                              "n": {
                                "docs": {},
                                "a": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "b": {
                                        "docs": {},
                                        "y": {
                                          "docs": {},
                                          "n": {
                                            "docs": {},
                                            "u": {
                                              "docs": {},
                                              "m": {
                                                "docs": {},
                                                "b": {
                                                  "docs": {
                                                    "Input.html#getCcNameByNumber": {
                                                      "ref": "Input.html#getCcNameByNumber",
                                                      "tf": 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "h": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "l": {
                                        "docs": {},
                                        "m": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "d": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "b": {
                                                  "docs": {},
                                                  "y": {
                                                    "docs": {},
                                                    "n": {
                                                      "docs": {},
                                                      "u": {
                                                        "docs": {},
                                                        "m": {
                                                          "docs": {},
                                                          "b": {
                                                            "docs": {
                                                              "Input.html#getChannelModeByNumber": {
                                                                "ref": "Input.html#getChannelModeByNumber",
                                                                "tf": 1150
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "o": {
                      "docs": {},
                      "p": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "n": {
                            "docs": {
                              "Input.html#open": {
                                "ref": "Input.html#open",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "c": {
                    "docs": {},
                    "h": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "l": {
                                "docs": {
                                  "InputChannel.html": {
                                    "ref": "InputChannel.html",
                                    "tf": 1925
                                  }
                                },
                                "#": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "u": {
                                      "docs": {},
                                      "m": {
                                        "docs": {},
                                        "b": {
                                          "docs": {
                                            "InputChannel.html#number": {
                                              "ref": "InputChannel.html#number",
                                              "tf": 1150
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "o": {
                                    "docs": {},
                                    "u": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "p": {
                                          "docs": {},
                                          "u": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "InputChannel.html#output": {
                                                  "ref": "InputChannel.html#output",
                                                  "tf": 1150
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "|": {
                    "docs": {},
                    "f": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "s": {
                            "docs": {
                              "WebMidi.html#getInputById": {
                                "ref": "WebMidi.html#getInputById",
                                "tf": 33.33333333333333
                              },
                              "WebMidi.html#getInputByName": {
                                "ref": "WebMidi.html#getInputByName",
                                "tf": 33.33333333333333
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "a": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "Input.html": {
                            "ref": "Input.html",
                            "tf": 2.083333333333333
                          },
                          "Output.html": {
                            "ref": "Output.html",
                            "tf": 2.083333333333333
                          },
                          "WebMidi.html": {
                            "ref": "WebMidi.html",
                            "tf": 2.586206896551724
                          }
                        }
                      }
                    },
                    "c": {
                      "docs": {
                        "WebMidi.html#interface": {
                          "ref": "WebMidi.html#interface",
                          "tf": 4.166666666666666
                        }
                      }
                    }
                  },
                  "l": {
                    "docs": {
                      "WebMidi.html#supported": {
                        "ref": "WebMidi.html#supported",
                        "tf": 1.7241379310344827
                      }
                    }
                  }
                },
                "e": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "Output.html#send": {
                          "ref": "Output.html#send",
                          "tf": 1.282051282051282
                        },
                        "Output.html#sendChannelAftertouch": {
                          "ref": "Output.html#sendChannelAftertouch",
                          "tf": 3.8461538461538463
                        },
                        "Output.html#sendControlChange": {
                          "ref": "Output.html#sendControlChange",
                          "tf": 0.2890173410404624
                        },
                        "OutputChannel.html#send": {
                          "ref": "OutputChannel.html#send",
                          "tf": 1.4285714285714286
                        },
                        "OutputChannel.html#sendControlChange": {
                          "ref": "OutputChannel.html#sendControlChange",
                          "tf": 0.2890173410404624
                        },
                        "WebMidi.html#getNoteNumberByName": {
                          "ref": "WebMidi.html#getNoteNumberByName",
                          "tf": 0.5681818181818182
                        },
                        "WebMidi.html#getOctave": {
                          "ref": "WebMidi.html#getOctave",
                          "tf": 1.282051282051282
                        },
                        "WebMidi.html#guessNoteNumber": {
                          "ref": "WebMidi.html#guessNoteNumber",
                          "tf": 1.25
                        }
                      }
                    }
                  }
                },
                "r": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "m": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "Output.html#sendSysex": {
                                "ref": "Output.html#sendSysex",
                                "tf": 0.33333333333333337
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "o": {
                "docs": {},
                "m": {
                  "docs": {
                    "WebMidi.html": {
                      "ref": "WebMidi.html",
                      "tf": 0.8620689655172413
                    }
                  },
                  "p": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "Input.html#nrpnEventsEnabled": {
                              "ref": "Input.html#nrpnEventsEnabled",
                              "tf": 1.0869565217391304
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "m": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "WebMidi.html#MIDI_NRPN_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                              "tf": 2
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "l": {
                "docs": {},
                "u": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "WebMidi.html#getNoteNumberByName": {
                        "ref": "WebMidi.html#getNoteNumberByName",
                        "tf": 1.1363636363636365
                      }
                    }
                  }
                }
              }
            },
            "v": {
              "docs": {},
              "a": {
                "docs": {},
                "l": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "Input.html#nrpnEventsEnabled": {
                          "ref": "Input.html#nrpnEventsEnabled",
                          "tf": 1.0869565217391304
                        },
                        "WebMidi.html#convertToTimestamp": {
                          "ref": "WebMidi.html#convertToTimestamp",
                          "tf": 1.3888888888888888
                        },
                        "WebMidi.html#guessNoteNumber": {
                          "ref": "WebMidi.html#guessNoteNumber",
                          "tf": 1.25
                        }
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "f": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "c": {
                        "docs": {
                          "WebMidi.html#interface": {
                            "ref": "WebMidi.html#interface",
                            "tf": 675
                          },
                          "WebMidi.html#MIDI_INTERFACE_EVENTS": {
                            "ref": "WebMidi.html#MIDI_INTERFACE_EVENTS",
                            "tf": 8.333333333333332
                          },
                          "WebMidi.html#disable": {
                            "ref": "WebMidi.html#disable",
                            "tf": 2.272727272727273
                          }
                        }
                      }
                    }
                  }
                },
                "g": {
                  "docs": {
                    "WebMidi.html#octaveOffset": {
                      "ref": "WebMidi.html#octaveOffset",
                      "tf": 1.3513513513513513
                    },
                    "WebMidi.html#getInputById": {
                      "ref": "WebMidi.html#getInputById",
                      "tf": 1.4705882352941175
                    },
                    "WebMidi.html#getOutputById": {
                      "ref": "WebMidi.html#getOutputById",
                      "tf": 1.4705882352941175
                    },
                    "WebMidi.html#guessNoteNumber": {
                      "ref": "WebMidi.html#guessNoteNumber",
                      "tf": 1.25
                    },
                    "WebMidi.html#sanitizeChannels": {
                      "ref": "WebMidi.html#sanitizeChannels",
                      "tf": 3.061224489795918
                    }
                  }
                }
              }
            },
            "b": {
              "docs": {},
              "o": {
                "docs": {},
                "u": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "WebMidi.html#octaveOffset": {
                          "ref": "WebMidi.html#octaveOffset",
                          "tf": 1.3513513513513513
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "d": {
            "docs": {
              "Input.html#id": {
                "ref": "Input.html#id",
                "tf": 692.0289855072464
              },
              "Output.html#id": {
                "ref": "Output.html#id",
                "tf": 692.0289855072464
              },
              "WebMidi.html#getInputById": {
                "ref": "WebMidi.html#getInputById",
                "tf": 39.2156862745098
              },
              "WebMidi.html#getOutputById": {
                "ref": "WebMidi.html#getOutputById",
                "tf": 39.2156862745098
              }
            },
            "e": {
              "docs": {},
              "n": {
                "docs": {},
                "t": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "f": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "Output.html#sendSysex": {
                            "ref": "Output.html#sendSysex",
                            "tf": 0.33333333333333337
                          },
                          "Output.html#setRegisteredParameter": {
                            "ref": "Output.html#setRegisteredParameter",
                            "tf": 0.3184713375796179
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "m": {
            "docs": {},
            "p": {
              "docs": {},
              "l": {
                "docs": {},
                "e": {
                  "docs": {},
                  "m": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "Output.html#clear": {
                              "ref": "Output.html#clear",
                              "tf": 7.6923076923076925
                            },
                            "Output.html#setRegisteredParameter": {
                              "ref": "Output.html#setRegisteredParameter",
                              "tf": 0.3184713375796179
                            },
                            "WebMidi.html#enable": {
                              "ref": "WebMidi.html#enable",
                              "tf": 0.2857142857142857
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "o": {
                "docs": {},
                "r": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.2857142857142857
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "e": {
                "docs": {},
                "d": {
                  "docs": {},
                  "i": {
                    "docs": {
                      "Output.html#sendStop": {
                        "ref": "Output.html#sendStop",
                        "tf": 3.571428571428571
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            "s": {
              "docs": {},
              "e": {
                "docs": {},
                "l": {
                  "docs": {},
                  "f": {
                    "docs": {
                      "Output.html#sendReset": {
                        "ref": "Output.html#sendReset",
                        "tf": 3.8461538461538463
                      },
                      "WebMidi.html#disable": {
                        "ref": "WebMidi.html#disable",
                        "tf": 2.272727272727273
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "f": {
              "docs": {
                "WebMidi.html": {
                  "ref": "WebMidi.html",
                  "tf": 0.8620689655172413
                }
              }
            }
          },
          "g": {
            "docs": {},
            "n": {
              "docs": {},
              "o": {
                "docs": {},
                "r": {
                  "docs": {
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.2857142857142857
                    },
                    "WebMidi.html#sanitizeChannels": {
                      "ref": "WebMidi.html#sanitizeChannels",
                      "tf": 1.0204081632653061
                    }
                  }
                }
              }
            }
          }
        },
        "j": {
          "docs": {},
          "a": {
            "docs": {},
            "v": {
              "docs": {},
              "a": {
                "docs": {},
                "s": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "index.html": {
                                "ref": "index.html",
                                "tf": 10
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "z": {
              "docs": {},
              "z": {
                "docs": {
                  "Input.html#id": {
                    "ref": "Input.html#id",
                    "tf": 2.1739130434782608
                  },
                  "Output.html#id": {
                    "ref": "Output.html#id",
                    "tf": 2.1739130434782608
                  },
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.2857142857142857
                  },
                  "WebMidi.html#getInputById": {
                    "ref": "WebMidi.html#getInputById",
                    "tf": 1.4705882352941175
                  },
                  "WebMidi.html#getInputByName": {
                    "ref": "WebMidi.html#getInputByName",
                    "tf": 2
                  },
                  "WebMidi.html#getOutputById": {
                    "ref": "WebMidi.html#getOutputById",
                    "tf": 1.4705882352941175
                  },
                  "WebMidi.html#getOutputByName": {
                    "ref": "WebMidi.html#getOutputByName",
                    "tf": 2
                  }
                }
              }
            }
          }
        },
        "l": {
          "docs": {},
          "i": {
            "docs": {},
            "b": {
              "docs": {},
              "r": {
                "docs": {},
                "a": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "i": {
                      "docs": {
                        "index.html": {
                          "ref": "index.html",
                          "tf": 10
                        },
                        "WebMidi.html": {
                          "ref": "WebMidi.html",
                          "tf": 0.8620689655172413
                        },
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.2857142857142857
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "t": {
                "docs": {
                  "list_class.html": {
                    "ref": "list_class.html",
                    "tf": 110
                  },
                  "Input.html": {
                    "ref": "Input.html",
                    "tf": 2.083333333333333
                  },
                  "Output.html": {
                    "ref": "Output.html",
                    "tf": 2.083333333333333
                  },
                  "Output.html#sendControlChange": {
                    "ref": "Output.html#sendControlChange",
                    "tf": 0.2890173410404624
                  },
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.6369426751592357
                  },
                  "OutputChannel.html#sendControlChange": {
                    "ref": "OutputChannel.html#sendControlChange",
                    "tf": 0.2890173410404624
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 0.78125
                  }
                },
                ":": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "s": {
                            "docs": {
                              "list_class.html": {
                                "ref": "list_class.html",
                                "tf": 1300
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "WebMidi.html#disable": {
                        "ref": "WebMidi.html#disable",
                        "tf": 2.272727272727273
                      },
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.5714285714285714
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "i": {
                "docs": {},
                "t": {
                  "docs": {
                    "Output.html#sendSysex": {
                      "ref": "Output.html#sendSysex",
                      "tf": 0.33333333333333337
                    },
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.3184713375796179
                    },
                    "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                      "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                      "tf": 0.78125
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            ";": {
              "docs": {},
              "s": {
                "docs": {},
                "t": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "c": {
                          "docs": {
                            "Input.html#.NRPN_TYPES": {
                              "ref": "Input.html#.NRPN_TYPES",
                              "tf": 25
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "d": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "y": {
                              "docs": {},
                              "&": {
                                "docs": {},
                                "g": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "Input.html#connection": {
                                        "ref": "Input.html#connection",
                                        "tf": 33.33333333333333
                                      },
                                      "Input.html#id": {
                                        "ref": "Input.html#id",
                                        "tf": 33.33333333333333
                                      },
                                      "Input.html#manufacturer": {
                                        "ref": "Input.html#manufacturer",
                                        "tf": 33.33333333333333
                                      },
                                      "Input.html#state": {
                                        "ref": "Input.html#state",
                                        "tf": 33.33333333333333
                                      },
                                      "Input.html#type": {
                                        "ref": "Input.html#type",
                                        "tf": 33.33333333333333
                                      },
                                      "Output.html#connection": {
                                        "ref": "Output.html#connection",
                                        "tf": 33.33333333333333
                                      },
                                      "Output.html#id": {
                                        "ref": "Output.html#id",
                                        "tf": 33.33333333333333
                                      },
                                      "Output.html#manufacturer": {
                                        "ref": "Output.html#manufacturer",
                                        "tf": 33.33333333333333
                                      },
                                      "Output.html#name": {
                                        "ref": "Output.html#name",
                                        "tf": 33.33333333333333
                                      },
                                      "Output.html#state": {
                                        "ref": "Output.html#state",
                                        "tf": 33.33333333333333
                                      },
                                      "Output.html#type": {
                                        "ref": "Output.html#type",
                                        "tf": 33.33333333333333
                                      },
                                      "WebMidi.html#enabled": {
                                        "ref": "WebMidi.html#enabled",
                                        "tf": 33.33333333333333
                                      },
                                      "WebMidi.html#inputs": {
                                        "ref": "WebMidi.html#inputs",
                                        "tf": 33.33333333333333
                                      },
                                      "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                                        "tf": 25
                                      },
                                      "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                                        "tf": 25
                                      },
                                      "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                                        "tf": 25
                                      },
                                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                        "tf": 25
                                      },
                                      "WebMidi.html#MIDI_INTERFACE_EVENTS": {
                                        "ref": "WebMidi.html#MIDI_INTERFACE_EVENTS",
                                        "tf": 33.33333333333333
                                      },
                                      "WebMidi.html#MIDI_NRPN_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                                        "tf": 25
                                      },
                                      "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                        "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                        "tf": 25
                                      },
                                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                                        "tf": 25
                                      },
                                      "WebMidi.html#NOTES": {
                                        "ref": "WebMidi.html#NOTES",
                                        "tf": 33.33333333333333
                                      },
                                      "WebMidi.html#outputs": {
                                        "ref": "WebMidi.html#outputs",
                                        "tf": 33.33333333333333
                                      },
                                      "WebMidi.html#supported": {
                                        "ref": "WebMidi.html#supported",
                                        "tf": 33.33333333333333
                                      },
                                      "WebMidi.html#sysexEnabled": {
                                        "ref": "WebMidi.html#sysexEnabled",
                                        "tf": 33.33333333333333
                                      },
                                      "WebMidi.html#time": {
                                        "ref": "WebMidi.html#time",
                                        "tf": 33.33333333333333
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "i": {
                              "docs": {
                                "WebMidi.html#interface": {
                                  "ref": "WebMidi.html#interface",
                                  "tf": 25
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "a": {
                "docs": {},
                "s": {
                  "docs": {},
                  "y": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "c": {
                        "docs": {},
                        "&": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "Input.html#destroy": {
                                  "ref": "Input.html#destroy",
                                  "tf": 33.33333333333333
                                },
                                "Input.html#open": {
                                  "ref": "Input.html#open",
                                  "tf": 33.33333333333333
                                },
                                "Output.html#close": {
                                  "ref": "Output.html#close",
                                  "tf": 33.33333333333333
                                },
                                "Output.html#destroy": {
                                  "ref": "Output.html#destroy",
                                  "tf": 33.33333333333333
                                },
                                "Output.html#open": {
                                  "ref": "Output.html#open",
                                  "tf": 33.33333333333333
                                },
                                "WebMidi.html#disable": {
                                  "ref": "WebMidi.html#disable",
                                  "tf": 33.33333333333333
                                },
                                "WebMidi.html#enable": {
                                  "ref": "WebMidi.html#enable",
                                  "tf": 25
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "g": {
              "docs": {},
              "i": {
                "docs": {},
                "c": {
                  "docs": {
                    "Input.html#nrpnEventsEnabled": {
                      "ref": "Input.html#nrpnEventsEnabled",
                      "tf": 1.0869565217391304
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "a": {
                "docs": {},
                "l": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "l": {
                                "docs": {
                                  "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                                    "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                                    "tf": 2.1739130434782608
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "h": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "WebMidi.html#enable": {
                              "ref": "WebMidi.html#enable",
                              "tf": 0.2857142857142857
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "d": {
                "docs": {
                  "WebMidi.html#time": {
                    "ref": "WebMidi.html#time",
                    "tf": 1.5625
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {
                  "Output.html#sendContinue": {
                    "ref": "Output.html#sendContinue",
                    "tf": 2.380952380952381
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.3184713375796179
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "g": {
              "docs": {},
              "a": {
                "docs": {},
                "t": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "p": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "d": {
                          "docs": {
                            "Output.html#sendControlChange": {
                              "ref": "Output.html#sendControlChange",
                              "tf": 0.2890173410404624
                            },
                            "OutputChannel.html#sendControlChange": {
                              "ref": "OutputChannel.html#sendControlChange",
                              "tf": 0.2890173410404624
                            },
                            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                              "tf": 0.4032258064516129
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "g": {
                "docs": {},
                "t": {
                  "docs": {},
                  "h": {
                    "docs": {
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 0.33333333333333337
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "s": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  },
                  "WebMidi.html#convertToTimestamp": {
                    "ref": "WebMidi.html#convertToTimestamp",
                    "tf": 1.3888888888888888
                  }
                }
              }
            },
            "v": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "Output.html#setPitchBendRange": {
                      "ref": "Output.html#setPitchBendRange",
                      "tf": 1.7857142857142856
                    }
                  }
                },
                "l": {
                  "docs": {
                    "WebMidi.html#MIDI_INTERFACE_EVENTS": {
                      "ref": "WebMidi.html#MIDI_INTERFACE_EVENTS",
                      "tf": 8.333333333333332
                    }
                  }
                }
              }
            }
          },
          "s": {
            "docs": {},
            "b": {
              "docs": {
                "Output.html#setPitchBendRange": {
                  "ref": "Output.html#setPitchBendRange",
                  "tf": 1.7857142857142856
                }
              }
            }
          }
        },
        "m": {
          "docs": {},
          "i": {
            "docs": {},
            "d": {
              "docs": {},
              "i": {
                "docs": {
                  "index.html": {
                    "ref": "index.html",
                    "tf": 10
                  },
                  "Input.html": {
                    "ref": "Input.html",
                    "tf": 4.166666666666666
                  },
                  "Input.html#id": {
                    "ref": "Input.html#id",
                    "tf": 2.1739130434782608
                  },
                  "Input.html#name": {
                    "ref": "Input.html#name",
                    "tf": 16.666666666666664
                  },
                  "Output.html": {
                    "ref": "Output.html",
                    "tf": 4.166666666666666
                  },
                  "Output.html#id": {
                    "ref": "Output.html#id",
                    "tf": 2.1739130434782608
                  },
                  "Output.html#name": {
                    "ref": "Output.html#name",
                    "tf": 16.666666666666664
                  },
                  "Output.html#close": {
                    "ref": "Output.html#close",
                    "tf": 6.25
                  },
                  "Output.html#send": {
                    "ref": "Output.html#send",
                    "tf": 7.6923076923076925
                  },
                  "Output.html#sendActiveSensing": {
                    "ref": "Output.html#sendActiveSensing",
                    "tf": 2.272727272727273
                  },
                  "Output.html#sendChannelAftertouch": {
                    "ref": "Output.html#sendChannelAftertouch",
                    "tf": 3.8461538461538463
                  },
                  "Output.html#sendClock": {
                    "ref": "Output.html#sendClock",
                    "tf": 7.6923076923076925
                  },
                  "Output.html#sendControlChange": {
                    "ref": "Output.html#sendControlChange",
                    "tf": 0.5780346820809248
                  },
                  "Output.html#sendKeyAftertouch": {
                    "ref": "Output.html#sendKeyAftertouch",
                    "tf": 2.7777777777777777
                  },
                  "Output.html#sendSongPosition": {
                    "ref": "Output.html#sendSongPosition",
                    "tf": 5.263157894736842
                  },
                  "Output.html#sendSongSelect": {
                    "ref": "Output.html#sendSongSelect",
                    "tf": 3.571428571428571
                  },
                  "Output.html#sendStart": {
                    "ref": "Output.html#sendStart",
                    "tf": 2.380952380952381
                  },
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  },
                  "Output.html#sendTimecodeQuarterFrame": {
                    "ref": "Output.html#sendTimecodeQuarterFrame",
                    "tf": 5
                  },
                  "Output.html#sendTuneRequest": {
                    "ref": "Output.html#sendTuneRequest",
                    "tf": 7.142857142857142
                  },
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 1.5923566878980893
                  },
                  "OutputChannel.html#send": {
                    "ref": "OutputChannel.html#send",
                    "tf": 7.142857142857142
                  },
                  "OutputChannel.html#sendControlChange": {
                    "ref": "OutputChannel.html#sendControlChange",
                    "tf": 0.5780346820809248
                  },
                  "OutputChannel.html#sendKeyAftertouch": {
                    "ref": "OutputChannel.html#sendKeyAftertouch",
                    "tf": 3.125
                  },
                  "WebMidi.html": {
                    "ref": "WebMidi.html",
                    "tf": 2.586206896551724
                  },
                  "WebMidi.html#enabled": {
                    "ref": "WebMidi.html#enabled",
                    "tf": 7.142857142857142
                  },
                  "WebMidi.html#inputs": {
                    "ref": "WebMidi.html#inputs",
                    "tf": 10
                  },
                  "WebMidi.html#interface": {
                    "ref": "WebMidi.html#interface",
                    "tf": 4.166666666666666
                  },
                  "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                    "tf": 3.571428571428571
                  },
                  "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                    "tf": 1.4285714285714286
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 0.78125
                  },
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 1.6853932584269662
                  },
                  "WebMidi.html#octaveOffset": {
                    "ref": "WebMidi.html#octaveOffset",
                    "tf": 4.054054054054054
                  },
                  "WebMidi.html#outputs": {
                    "ref": "WebMidi.html#outputs",
                    "tf": 10
                  },
                  "WebMidi.html#supported": {
                    "ref": "WebMidi.html#supported",
                    "tf": 3.4482758620689653
                  },
                  "WebMidi.html#sysexEnabled": {
                    "ref": "WebMidi.html#sysexEnabled",
                    "tf": 4.166666666666666
                  },
                  "WebMidi.html#disable": {
                    "ref": "WebMidi.html#disable",
                    "tf": 2.272727272727273
                  },
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 1.1428571428571428
                  },
                  "WebMidi.html#getInputById": {
                    "ref": "WebMidi.html#getInputById",
                    "tf": 1.4705882352941175
                  },
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 1.7045454545454544
                  },
                  "WebMidi.html#getOctave": {
                    "ref": "WebMidi.html#getOctave",
                    "tf": 1.282051282051282
                  },
                  "WebMidi.html#getOutputById": {
                    "ref": "WebMidi.html#getOutputById",
                    "tf": 1.4705882352941175
                  },
                  "WebMidi.html#guessNoteNumber": {
                    "ref": "WebMidi.html#guessNoteNumber",
                    "tf": 1.25
                  },
                  "WebMidi.html#sanitizeChannels": {
                    "ref": "WebMidi.html#sanitizeChannels",
                    "tf": 1.0204081632653061
                  }
                },
                "a": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "s": {
                            "docs": {
                              "WebMidi.html#interface": {
                                "ref": "WebMidi.html#interface",
                                "tf": 29.166666666666664
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "_": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "h": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "l": {
                                "docs": {},
                                "_": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "s": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "g": {
                                              "docs": {
                                                "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                                                  "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                                                  "tf": 675
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "o": {
                                      "docs": {},
                                      "d": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "_": {
                                            "docs": {},
                                            "m": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "a": {
                                                      "docs": {},
                                                      "g": {
                                                        "docs": {
                                                          "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                                                            "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                                                            "tf": 675
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "v": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "c": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "_": {
                                              "docs": {},
                                              "m": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "s": {
                                                      "docs": {},
                                                      "a": {
                                                        "docs": {},
                                                        "g": {
                                                          "docs": {
                                                            "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                                                              "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                                                              "tf": 3.571428571428571
                                                            },
                                                            "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                                                              "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                                                              "tf": 675
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "o": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "l": {
                                "docs": {},
                                "_": {
                                  "docs": {},
                                  "c": {
                                    "docs": {},
                                    "h": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "g": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "_": {
                                                "docs": {},
                                                "m": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "s": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {},
                                                        "a": {
                                                          "docs": {},
                                                          "g": {
                                                            "docs": {
                                                              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                                "tf": 675
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "i": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "f": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "c": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "_": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "v": {
                                          "docs": {
                                            "WebMidi.html#MIDI_INTERFACE_EVENTS": {
                                              "ref": "WebMidi.html#MIDI_INTERFACE_EVENTS",
                                              "tf": 683.3333333333334
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "n": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "p": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "_": {
                            "docs": {},
                            "m": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "g": {
                                        "docs": {
                                          "WebMidi.html#MIDI_NRPN_MESSAGES": {
                                            "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                                            "tf": 675
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "r": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "g": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "d": {
                                      "docs": {},
                                      "_": {
                                        "docs": {},
                                        "p": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "a": {
                                                "docs": {},
                                                "m": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "t": {
                                                      "docs": {
                                                        "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                                          "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                                          "tf": 675
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "s": {
                    "docs": {},
                    "y": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "m": {
                              "docs": {},
                              "_": {
                                "docs": {},
                                "m": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "s": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "g": {
                                            "docs": {
                                              "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                                                "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                                                "tf": 675
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "m": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "g": {
                            "docs": {
                              "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                                "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                                "tf": 0.5617977528089888
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "d": {
                "docs": {},
                "l": {
                  "docs": {
                    "WebMidi.html#octaveOffset": {
                      "ref": "WebMidi.html#octaveOffset",
                      "tf": 1.3513513513513513
                    },
                    "WebMidi.html#getNoteNumberByName": {
                      "ref": "WebMidi.html#getNoteNumberByName",
                      "tf": 0.5681818181818182
                    },
                    "WebMidi.html#getOctave": {
                      "ref": "WebMidi.html#getOctave",
                      "tf": 1.282051282051282
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "r": {
                "docs": {},
                "o": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "c": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "d": {
                              "docs": {
                                "WebMidi.html#time": {
                                  "ref": "WebMidi.html#time",
                                  "tf": 1.5625
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "l": {
                "docs": {},
                "i": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "c": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "d": {
                              "docs": {
                                "WebMidi.html#time": {
                                  "ref": "WebMidi.html#time",
                                  "tf": 6.25
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "m": {
              "docs": {},
              "b": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "Input.html#.NRPN_TYPES": {
                        "ref": "Input.html#.NRPN_TYPES",
                        "tf": 110
                      },
                      "Input.html#connection": {
                        "ref": "Input.html#connection",
                        "tf": 110
                      },
                      "Input.html#id": {
                        "ref": "Input.html#id",
                        "tf": 110
                      },
                      "Input.html#manufacturer": {
                        "ref": "Input.html#manufacturer",
                        "tf": 110
                      },
                      "Input.html#name": {
                        "ref": "Input.html#name",
                        "tf": 110
                      },
                      "Input.html#nrpnEventsEnabled": {
                        "ref": "Input.html#nrpnEventsEnabled",
                        "tf": 110
                      },
                      "Input.html#state": {
                        "ref": "Input.html#state",
                        "tf": 110
                      },
                      "Input.html#type": {
                        "ref": "Input.html#type",
                        "tf": 110
                      },
                      "InputChannel.html#number": {
                        "ref": "InputChannel.html#number",
                        "tf": 110
                      },
                      "InputChannel.html#output": {
                        "ref": "InputChannel.html#output",
                        "tf": 110
                      },
                      "Output.html#channels": {
                        "ref": "Output.html#channels",
                        "tf": 110
                      },
                      "Output.html#connection": {
                        "ref": "Output.html#connection",
                        "tf": 110
                      },
                      "Output.html#id": {
                        "ref": "Output.html#id",
                        "tf": 110
                      },
                      "Output.html#manufacturer": {
                        "ref": "Output.html#manufacturer",
                        "tf": 110
                      },
                      "Output.html#name": {
                        "ref": "Output.html#name",
                        "tf": 110
                      },
                      "Output.html#state": {
                        "ref": "Output.html#state",
                        "tf": 110
                      },
                      "Output.html#type": {
                        "ref": "Output.html#type",
                        "tf": 110
                      },
                      "OutputChannel.html#number": {
                        "ref": "OutputChannel.html#number",
                        "tf": 110
                      },
                      "OutputChannel.html#output": {
                        "ref": "OutputChannel.html#output",
                        "tf": 110
                      },
                      "WebMidi.html#enabled": {
                        "ref": "WebMidi.html#enabled",
                        "tf": 110
                      },
                      "WebMidi.html#inputs": {
                        "ref": "WebMidi.html#inputs",
                        "tf": 110
                      },
                      "WebMidi.html#interface": {
                        "ref": "WebMidi.html#interface",
                        "tf": 110
                      },
                      "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                        "tf": 110
                      },
                      "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                        "tf": 110
                      },
                      "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                        "tf": 110
                      },
                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                        "tf": 110
                      },
                      "WebMidi.html#MIDI_INTERFACE_EVENTS": {
                        "ref": "WebMidi.html#MIDI_INTERFACE_EVENTS",
                        "tf": 110
                      },
                      "WebMidi.html#MIDI_NRPN_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                        "tf": 110
                      },
                      "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                        "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                        "tf": 110
                      },
                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                        "tf": 110
                      },
                      "WebMidi.html#NOTES": {
                        "ref": "WebMidi.html#NOTES",
                        "tf": 110
                      },
                      "WebMidi.html#octaveOffset": {
                        "ref": "WebMidi.html#octaveOffset",
                        "tf": 110
                      },
                      "WebMidi.html#outputs": {
                        "ref": "WebMidi.html#outputs",
                        "tf": 110
                      },
                      "WebMidi.html#supported": {
                        "ref": "WebMidi.html#supported",
                        "tf": 110
                      },
                      "WebMidi.html#sysexEnabled": {
                        "ref": "WebMidi.html#sysexEnabled",
                        "tf": 110
                      },
                      "WebMidi.html#time": {
                        "ref": "WebMidi.html#time",
                        "tf": 110
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "s": {
                "docs": {},
                "a": {
                  "docs": {},
                  "g": {
                    "docs": {
                      "Input.html#nrpnEventsEnabled": {
                        "ref": "Input.html#nrpnEventsEnabled",
                        "tf": 4.3478260869565215
                      },
                      "Input.html#getCcNameByNumber": {
                        "ref": "Input.html#getCcNameByNumber",
                        "tf": 3.8461538461538463
                      },
                      "Output.html#clear": {
                        "ref": "Output.html#clear",
                        "tf": 3.8461538461538463
                      },
                      "Output.html#close": {
                        "ref": "Output.html#close",
                        "tf": 6.25
                      },
                      "Output.html#send": {
                        "ref": "Output.html#send",
                        "tf": 5.128205128205128
                      },
                      "Output.html#sendActiveSensing": {
                        "ref": "Output.html#sendActiveSensing",
                        "tf": 4.545454545454546
                      },
                      "Output.html#sendChannelAftertouch": {
                        "ref": "Output.html#sendChannelAftertouch",
                        "tf": 3.8461538461538463
                      },
                      "Output.html#sendClock": {
                        "ref": "Output.html#sendClock",
                        "tf": 3.8461538461538463
                      },
                      "Output.html#sendContinue": {
                        "ref": "Output.html#sendContinue",
                        "tf": 4.761904761904762
                      },
                      "Output.html#sendControlChange": {
                        "ref": "Output.html#sendControlChange",
                        "tf": 1.7341040462427744
                      },
                      "Output.html#sendKeyAftertouch": {
                        "ref": "Output.html#sendKeyAftertouch",
                        "tf": 5.555555555555555
                      },
                      "Output.html#sendReset": {
                        "ref": "Output.html#sendReset",
                        "tf": 3.8461538461538463
                      },
                      "Output.html#sendSongPosition": {
                        "ref": "Output.html#sendSongPosition",
                        "tf": 2.631578947368421
                      },
                      "Output.html#sendSongSelect": {
                        "ref": "Output.html#sendSongSelect",
                        "tf": 3.571428571428571
                      },
                      "Output.html#sendStart": {
                        "ref": "Output.html#sendStart",
                        "tf": 4.761904761904762
                      },
                      "Output.html#sendStop": {
                        "ref": "Output.html#sendStop",
                        "tf": 3.571428571428571
                      },
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 2.3333333333333335
                      },
                      "Output.html#sendTimecodeQuarterFrame": {
                        "ref": "Output.html#sendTimecodeQuarterFrame",
                        "tf": 2.5
                      },
                      "Output.html#sendTuneRequest": {
                        "ref": "Output.html#sendTuneRequest",
                        "tf": 7.142857142857142
                      },
                      "Output.html#setPitchBendRange": {
                        "ref": "Output.html#setPitchBendRange",
                        "tf": 1.7857142857142856
                      },
                      "Output.html#setRegisteredParameter": {
                        "ref": "Output.html#setRegisteredParameter",
                        "tf": 0.3184713375796179
                      },
                      "OutputChannel.html#send": {
                        "ref": "OutputChannel.html#send",
                        "tf": 5.714285714285714
                      },
                      "OutputChannel.html#sendControlChange": {
                        "ref": "OutputChannel.html#sendControlChange",
                        "tf": 1.7341040462427744
                      },
                      "OutputChannel.html#sendKeyAftertouch": {
                        "ref": "OutputChannel.html#sendKeyAftertouch",
                        "tf": 6.25
                      },
                      "WebMidi.html": {
                        "ref": "WebMidi.html",
                        "tf": 1.7241379310344827
                      },
                      "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                        "tf": 3.571428571428571
                      },
                      "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                        "tf": 2.1739130434782608
                      },
                      "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                        "tf": 1.4285714285714286
                      },
                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                        "tf": 0.4032258064516129
                      },
                      "WebMidi.html#MIDI_NRPN_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                        "tf": 4
                      },
                      "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                        "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                        "tf": 0.78125
                      },
                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                        "tf": 3.3707865168539324
                      },
                      "WebMidi.html#octaveOffset": {
                        "ref": "WebMidi.html#octaveOffset",
                        "tf": 1.3513513513513513
                      },
                      "WebMidi.html#sysexEnabled": {
                        "ref": "WebMidi.html#sysexEnabled",
                        "tf": 4.166666666666666
                      },
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.5714285714285714
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "h": {
                "docs": {},
                "o": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "Output.html#clear": {
                        "ref": "Output.html#clear",
                        "tf": 3.8461538461538463
                      },
                      "Output.html#send": {
                        "ref": "Output.html#send",
                        "tf": 2.564102564102564
                      },
                      "Output.html#sendContinue": {
                        "ref": "Output.html#sendContinue",
                        "tf": 2.380952380952381
                      },
                      "Output.html#sendStart": {
                        "ref": "Output.html#sendStart",
                        "tf": 2.380952380952381
                      },
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 0.33333333333333337
                      },
                      "OutputChannel.html#send": {
                        "ref": "OutputChannel.html#send",
                        "tf": 2.857142857142857
                      },
                      "WebMidi.html#sysexEnabled": {
                        "ref": "WebMidi.html#sysexEnabled",
                        "tf": 4.166666666666666
                      },
                      "WebMidi.html#getOctave": {
                        "ref": "WebMidi.html#getOctave",
                        "tf": 1.282051282051282
                      },
                      "WebMidi.html#guessNoteNumber": {
                        "ref": "WebMidi.html#guessNoteNumber",
                        "tf": 1.25
                      }
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "n": {
                "docs": {
                  "Output.html#sendControlChange": {
                    "ref": "Output.html#sendControlChange",
                    "tf": 0.5780346820809248
                  },
                  "OutputChannel.html#sendControlChange": {
                    "ref": "OutputChannel.html#sendControlChange",
                    "tf": 0.5780346820809248
                  },
                  "WebMidi.html": {
                    "ref": "WebMidi.html",
                    "tf": 0.8620689655172413
                  },
                  "WebMidi.html#disable": {
                    "ref": "WebMidi.html#disable",
                    "tf": 2.272727272727273
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "k": {
              "docs": {},
              "e": {
                "docs": {
                  "Input.html#manufacturer": {
                    "ref": "Input.html#manufacturer",
                    "tf": 7.142857142857142
                  },
                  "Output.html#manufacturer": {
                    "ref": "Output.html#manufacturer",
                    "tf": 7.142857142857142
                  },
                  "WebMidi.html": {
                    "ref": "WebMidi.html",
                    "tf": 0.8620689655172413
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "u": {
                "docs": {},
                "f": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "u": {
                          "docs": {},
                          "r": {
                            "docs": {
                              "Input.html#manufacturer": {
                                "ref": "Input.html#manufacturer",
                                "tf": 690.4761904761905
                              },
                              "Output.html#manufacturer": {
                                "ref": "Output.html#manufacturer",
                                "tf": 690.4761904761905
                              },
                              "Output.html#send": {
                                "ref": "Output.html#send",
                                "tf": 1.282051282051282
                              },
                              "Output.html#sendSysex": {
                                "ref": "Output.html#sendSysex",
                                "tf": 20.333333333333332
                              },
                              "OutputChannel.html#send": {
                                "ref": "OutputChannel.html#send",
                                "tf": 1.4285714285714286
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "c": {
                "docs": {},
                "h": {
                  "docs": {
                    "Input.html#getCcNameByNumber": {
                      "ref": "Input.html#getCcNameByNumber",
                      "tf": 7.6923076923076925
                    },
                    "Input.html#getChannelModeByNumber": {
                      "ref": "Input.html#getChannelModeByNumber",
                      "tf": 8.333333333333332
                    },
                    "Output.html#sendControlChange": {
                      "ref": "Output.html#sendControlChange",
                      "tf": 0.2890173410404624
                    },
                    "OutputChannel.html#sendControlChange": {
                      "ref": "OutputChannel.html#sendControlChange",
                      "tf": 0.2890173410404624
                    },
                    "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                      "tf": 0.5617977528089888
                    },
                    "WebMidi.html#getInputById": {
                      "ref": "WebMidi.html#getInputById",
                      "tf": 2.941176470588235
                    },
                    "WebMidi.html#getNoteNumberByName": {
                      "ref": "WebMidi.html#getNoteNumberByName",
                      "tf": 0.5681818181818182
                    },
                    "WebMidi.html#getOutputById": {
                      "ref": "WebMidi.html#getOutputById",
                      "tf": 2.941176470588235
                    }
                  }
                }
              },
              "t": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.2857142857142857
                      }
                    }
                  }
                }
              }
            },
            "x": {
              "docs": {},
              "i": {
                "docs": {},
                "m": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "m": {
                      "docs": {
                        "Output.html#setRegisteredParameter": {
                          "ref": "Output.html#setRegisteredParameter",
                          "tf": 0.6369426751592357
                        }
                      },
                      "d": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "Output.html#setRegisteredParameter": {
                                  "ref": "Output.html#setRegisteredParameter",
                                  "tf": 0.3184713375796179
                                },
                                "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                  "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                  "tf": 0.78125
                                }
                              },
                              "a": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "c": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "n": {
                                              "docs": {
                                                "Output.html#setRegisteredParameter": {
                                                  "ref": "Output.html#setRegisteredParameter",
                                                  "tf": 0.3184713375796179
                                                },
                                                "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                                  "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                                  "tf": 0.78125
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "d": {
              "docs": {},
              "e": {
                "docs": {
                  "Input.html#getChannelModeByNumber": {
                    "ref": "Input.html#getChannelModeByNumber",
                    "tf": 4.166666666666666
                  },
                  "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                    "tf": 2.1739130434782608
                  }
                }
              },
              "u": {
                "docs": {},
                "l": {
                  "docs": {
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.3184713375796179
                    },
                    "WebMidi.html": {
                      "ref": "WebMidi.html",
                      "tf": 1.7241379310344827
                    }
                  },
                  "a": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "w": {
                              "docs": {},
                              "h": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "l": {
                                      "docs": {},
                                      "c": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "s": {
                                                "docs": {
                                                  "Output.html#sendControlChange": {
                                                    "ref": "Output.html#sendControlChange",
                                                    "tf": 0.2890173410404624
                                                  },
                                                  "OutputChannel.html#sendControlChange": {
                                                    "ref": "OutputChannel.html#sendControlChange",
                                                    "tf": 0.2890173410404624
                                                  },
                                                  "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                    "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                    "tf": 0.4032258064516129
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "f": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "n": {
                                            "docs": {
                                              "Output.html#sendControlChange": {
                                                "ref": "Output.html#sendControlChange",
                                                "tf": 0.2890173410404624
                                              },
                                              "OutputChannel.html#sendControlChange": {
                                                "ref": "OutputChannel.html#sendControlChange",
                                                "tf": 0.2890173410404624
                                              },
                                              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                "tf": 0.4032258064516129
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "r": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "g": {
                                    "docs": {
                                      "Output.html#setRegisteredParameter": {
                                        "ref": "Output.html#setRegisteredParameter",
                                        "tf": 0.3184713375796179
                                      },
                                      "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                        "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                        "tf": 0.78125
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "o": {
                "docs": {},
                "m": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "d": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "n": {
                            "docs": {
                              "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                                "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                                "tf": 2.1739130434782608
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "s": {
            "docs": {
              "Output.html#sendActiveSensing": {
                "ref": "Output.html#sendActiveSensing",
                "tf": 2.272727272727273
              }
            },
            "b": {
              "docs": {
                "Output.html#setPitchBendRange": {
                  "ref": "Output.html#setPitchBendRange",
                  "tf": 1.7857142857142856
                }
              }
            }
          }
        },
        "r": {
          "docs": {},
          "e": {
            "docs": {},
            "a": {
              "docs": {},
              "d": {
                "docs": {},
                "m": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 110
                    }
                  }
                },
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "y": {
                        "docs": {},
                        "&": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "Input.html#.NRPN_TYPES": {
                                  "ref": "Input.html#.NRPN_TYPES",
                                  "tf": 25
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "s": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "Input.html": {
                        "ref": "Input.html",
                        "tf": 2.083333333333333
                      },
                      "Output.html": {
                        "ref": "Output.html",
                        "tf": 2.083333333333333
                      }
                    }
                  }
                }
              },
              "l": {
                "docs": {
                  "Output.html#sendActiveSensing": {
                    "ref": "Output.html#sendActiveSensing",
                    "tf": 2.272727272727273
                  },
                  "Output.html#sendClock": {
                    "ref": "Output.html#sendClock",
                    "tf": 3.8461538461538463
                  },
                  "Output.html#sendContinue": {
                    "ref": "Output.html#sendContinue",
                    "tf": 2.380952380952381
                  },
                  "Output.html#sendReset": {
                    "ref": "Output.html#sendReset",
                    "tf": 3.8461538461538463
                  },
                  "Output.html#sendStart": {
                    "ref": "Output.html#sendStart",
                    "tf": 2.380952380952381
                  },
                  "Output.html#sendStop": {
                    "ref": "Output.html#sendStop",
                    "tf": 3.571428571428571
                  },
                  "Output.html#sendTuneRequest": {
                    "ref": "Output.html#sendTuneRequest",
                    "tf": 7.142857142857142
                  },
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              },
              "c": {
                "docs": {},
                "t": {
                  "docs": {
                    "WebMidi.html": {
                      "ref": "WebMidi.html",
                      "tf": 0.8620689655172413
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "Input.html": {
                        "ref": "Input.html",
                        "tf": 2.083333333333333
                      },
                      "Output.html": {
                        "ref": "Output.html",
                        "tf": 2.083333333333333
                      }
                    }
                  }
                }
              },
              "o": {
                "docs": {},
                "r": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Input.html#id": {
                        "ref": "Input.html#id",
                        "tf": 2.1739130434782608
                      },
                      "Output.html#id": {
                        "ref": "Output.html#id",
                        "tf": 2.1739130434782608
                      },
                      "WebMidi.html#octaveOffset": {
                        "ref": "WebMidi.html#octaveOffset",
                        "tf": 2.7027027027027026
                      },
                      "WebMidi.html#supported": {
                        "ref": "WebMidi.html#supported",
                        "tf": 1.7241379310344827
                      },
                      "WebMidi.html#getInputByName": {
                        "ref": "WebMidi.html#getInputByName",
                        "tf": 2
                      },
                      "WebMidi.html#getOutputByName": {
                        "ref": "WebMidi.html#getOutputByName",
                        "tf": 2
                      }
                    }
                  }
                }
              }
            },
            "g": {
              "docs": {},
              "i": {
                "docs": {},
                "s": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Input.html#.NRPN_TYPES": {
                        "ref": "Input.html#.NRPN_TYPES",
                        "tf": 6.25
                      },
                      "Input.html#nrpnEventsEnabled": {
                        "ref": "Input.html#nrpnEventsEnabled",
                        "tf": 1.0869565217391304
                      },
                      "Output.html#setRegisteredParameter": {
                        "ref": "Output.html#setRegisteredParameter",
                        "tf": 0.9554140127388535
                      },
                      "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                        "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                        "tf": 1.5625
                      }
                    },
                    "e": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "d": {
                            "docs": {},
                            "p": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "a": {
                                    "docs": {},
                                    "m": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "c": {
                                                "docs": {},
                                                "o": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "r": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {
                                                          "Output.html#sendControlChange": {
                                                            "ref": "Output.html#sendControlChange",
                                                            "tf": 0.2890173410404624
                                                          },
                                                          "OutputChannel.html#sendControlChange": {
                                                            "ref": "OutputChannel.html#sendControlChange",
                                                            "tf": 0.2890173410404624
                                                          },
                                                          "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                            "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                            "tf": 0.4032258064516129
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              },
                                              "f": {
                                                "docs": {},
                                                "i": {
                                                  "docs": {},
                                                  "n": {
                                                    "docs": {
                                                      "Output.html#sendControlChange": {
                                                        "ref": "Output.html#sendControlChange",
                                                        "tf": 0.2890173410404624
                                                      },
                                                      "OutputChannel.html#sendControlChange": {
                                                        "ref": "OutputChannel.html#sendControlChange",
                                                        "tf": 0.2890173410404624
                                                      },
                                                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                        "tf": 0.4032258064516129
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "e": {
                "docs": {},
                "i": {
                  "docs": {},
                  "v": {
                    "docs": {
                      "Input.html#nrpnEventsEnabled": {
                        "ref": "Input.html#nrpnEventsEnabled",
                        "tf": 2.1739130434782608
                      },
                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                        "tf": 0.5617977528089888
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "u": {
                "docs": {},
                "r": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "Input.html#getCcNameByNumber": {
                        "ref": "Input.html#getCcNameByNumber",
                        "tf": 7.6923076923076925
                      },
                      "Input.html#getChannelModeByNumber": {
                        "ref": "Input.html#getChannelModeByNumber",
                        "tf": 8.333333333333332
                      },
                      "WebMidi.html#convertToTimestamp": {
                        "ref": "WebMidi.html#convertToTimestamp",
                        "tf": 5.555555555555555
                      },
                      "WebMidi.html#getInputById": {
                        "ref": "WebMidi.html#getInputById",
                        "tf": 1.4705882352941175
                      },
                      "WebMidi.html#getInputByName": {
                        "ref": "WebMidi.html#getInputByName",
                        "tf": 2
                      },
                      "WebMidi.html#getNoteNumberByName": {
                        "ref": "WebMidi.html#getNoteNumberByName",
                        "tf": 1.1363636363636365
                      },
                      "WebMidi.html#getOctave": {
                        "ref": "WebMidi.html#getOctave",
                        "tf": 2.564102564102564
                      },
                      "WebMidi.html#getOutputById": {
                        "ref": "WebMidi.html#getOutputById",
                        "tf": 1.4705882352941175
                      },
                      "WebMidi.html#getOutputByName": {
                        "ref": "WebMidi.html#getOutputByName",
                        "tf": 2
                      },
                      "WebMidi.html#guessNoteNumber": {
                        "ref": "WebMidi.html#guessNoteNumber",
                        "tf": 3.75
                      },
                      "WebMidi.html#sanitizeChannels": {
                        "ref": "WebMidi.html#sanitizeChannels",
                        "tf": 3.061224489795918
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "u": {
                "docs": {},
                "m": {
                  "docs": {
                    "Output.html#sendContinue": {
                      "ref": "Output.html#sendContinue",
                      "tf": 2.380952380952381
                    }
                  }
                },
                "l": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "WebMidi.html#convertToTimestamp": {
                        "ref": "WebMidi.html#convertToTimestamp",
                        "tf": 1.3888888888888888
                      },
                      "WebMidi.html#getNoteNumberByName": {
                        "ref": "WebMidi.html#getNoteNumberByName",
                        "tf": 1.1363636363636365
                      },
                      "WebMidi.html#getOctave": {
                        "ref": "WebMidi.html#getOctave",
                        "tf": 1.282051282051282
                      },
                      "WebMidi.html#sanitizeChannels": {
                        "ref": "WebMidi.html#sanitizeChannels",
                        "tf": 2.0408163265306123
                      }
                    }
                  }
                }
              },
              "o": {
                "docs": {},
                "n": {
                  "docs": {
                    "Output.html#sendControlChange": {
                      "ref": "Output.html#sendControlChange",
                      "tf": 0.2890173410404624
                    },
                    "OutputChannel.html#sendControlChange": {
                      "ref": "OutputChannel.html#sendControlChange",
                      "tf": 0.2890173410404624
                    },
                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                      "tf": 0.4032258064516129
                    }
                  }
                },
                "l": {
                  "docs": {},
                  "v": {
                    "docs": {
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.5714285714285714
                      }
                    }
                  }
                }
              },
              "e": {
                "docs": {},
                "t": {
                  "docs": {
                    "Output.html#sendReset": {
                      "ref": "Output.html#sendReset",
                      "tf": 7.6923076923076925
                    },
                    "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                      "tf": 0.5617977528089888
                    }
                  },
                  "a": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "c": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "t": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "l": {
                                      "docs": {
                                        "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                                          "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                                          "tf": 2.1739130434782608
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "p": {
                "docs": {},
                "e": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.2857142857142857
                        }
                      }
                    }
                  }
                }
              }
            },
            "v": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "b": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "v": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "l": {
                              "docs": {
                                "Output.html#sendControlChange": {
                                  "ref": "Output.html#sendControlChange",
                                  "tf": 0.2890173410404624
                                },
                                "OutputChannel.html#sendControlChange": {
                                  "ref": "OutputChannel.html#sendControlChange",
                                  "tf": 0.2890173410404624
                                },
                                "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                  "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                  "tf": 0.4032258064516129
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "q": {
              "docs": {},
              "u": {
                "docs": {},
                "e": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Output.html#sendTuneRequest": {
                          "ref": "Output.html#sendTuneRequest",
                          "tf": 7.142857142857142
                        }
                      }
                    }
                  }
                }
              }
            },
            "f": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.3184713375796179
                    }
                  },
                  "e": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "c": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "d": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "s": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "a": {
                                    "docs": {},
                                    "n": {
                                      "docs": {},
                                      "c": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "a": {
                                              "docs": {},
                                              "t": {
                                                "docs": {},
                                                "i": {
                                                  "docs": {},
                                                  "o": {
                                                    "docs": {
                                                      "Output.html#setRegisteredParameter": {
                                                        "ref": "Output.html#setRegisteredParameter",
                                                        "tf": 0.3184713375796179
                                                      },
                                                      "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                                        "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                                        "tf": 0.78125
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {
                "WebMidi.html#convertToTimestamp": {
                  "ref": "WebMidi.html#convertToTimestamp",
                  "tf": 1.3888888888888888
                }
              },
              "a": {
                "docs": {},
                "y": {
                  "docs": {
                    "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                      "tf": 0.5617977528089888
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "n": {
              "docs": {},
              "g": {
                "docs": {
                  "Output.html#setPitchBendRange": {
                    "ref": "Output.html#setPitchBendRange",
                    "tf": 5.357142857142857
                  },
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.6369426751592357
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "i": {
                "docs": {},
                "o": {
                  "docs": {
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.6369426751592357
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "l": {
              "docs": {},
              "l": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  }
                },
                "a": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "g": {
                      "docs": {},
                      "l": {
                        "docs": {
                          "Output.html#setRegisteredParameter": {
                            "ref": "Output.html#setRegisteredParameter",
                            "tf": 0.3184713375796179
                          },
                          "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                            "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                            "tf": 0.78125
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "t": {
          "docs": {},
          "a": {
            "docs": {},
            "m": {
              "docs": {},
              "e": {
                "docs": {
                  "index.html": {
                    "ref": "index.html",
                    "tf": 10
                  }
                }
              }
            },
            "b": {
              "docs": {},
              "l": {
                "docs": {
                  "Output.html#sendControlChange": {
                    "ref": "Output.html#sendControlChange",
                    "tf": 0.2890173410404624
                  },
                  "OutputChannel.html#sendControlChange": {
                    "ref": "OutputChannel.html#sendControlChange",
                    "tf": 0.2890173410404624
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "k": {
                "docs": {
                  "WebMidi.html#interface": {
                    "ref": "WebMidi.html#interface",
                    "tf": 4.166666666666666
                  }
                }
              }
            }
          },
          "y": {
            "docs": {},
            "p": {
              "docs": {},
              "e": {
                "docs": {
                  "Input.html#.NRPN_TYPES": {
                    "ref": "Input.html#.NRPN_TYPES",
                    "tf": 6.25
                  },
                  "Input.html#type": {
                    "ref": "Input.html#type",
                    "tf": 695.8333333333334
                  },
                  "Output.html#type": {
                    "ref": "Output.html#type",
                    "tf": 695.8333333333334
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "r": {
              "docs": {},
              "o": {
                "docs": {},
                "u": {
                  "docs": {},
                  "g": {
                    "docs": {},
                    "h": {
                      "docs": {
                        "Input.html#nrpnEventsEnabled": {
                          "ref": "Input.html#nrpnEventsEnabled",
                          "tf": 1.0869565217391304
                        }
                      }
                    }
                  }
                },
                "w": {
                  "docs": {
                    "WebMidi.html#getNoteNumberByName": {
                      "ref": "WebMidi.html#getNoteNumberByName",
                      "tf": 0.5681818181818182
                    },
                    "WebMidi.html#guessNoteNumber": {
                      "ref": "WebMidi.html#guessNoteNumber",
                      "tf": 1.25
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "f": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "r": {
                        "docs": {
                          "Output.html#sendSysex": {
                            "ref": "Output.html#sendSysex",
                            "tf": 0.33333333333333337
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "u": {
                "docs": {},
                "g": {
                  "docs": {},
                  "h": {
                    "docs": {
                      "WebMidi.html#supported": {
                        "ref": "WebMidi.html#supported",
                        "tf": 1.7241379310344827
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "m": {
              "docs": {},
              "e": {
                "docs": {
                  "Output.html#sendActiveSensing": {
                    "ref": "Output.html#sendActiveSensing",
                    "tf": 2.272727272727273
                  },
                  "Output.html#sendClock": {
                    "ref": "Output.html#sendClock",
                    "tf": 3.8461538461538463
                  },
                  "Output.html#sendContinue": {
                    "ref": "Output.html#sendContinue",
                    "tf": 2.380952380952381
                  },
                  "Output.html#sendControlChange": {
                    "ref": "Output.html#sendControlChange",
                    "tf": 0.2890173410404624
                  },
                  "Output.html#sendKeyAftertouch": {
                    "ref": "Output.html#sendKeyAftertouch",
                    "tf": 2.7777777777777777
                  },
                  "Output.html#sendReset": {
                    "ref": "Output.html#sendReset",
                    "tf": 3.8461538461538463
                  },
                  "Output.html#sendStart": {
                    "ref": "Output.html#sendStart",
                    "tf": 2.380952380952381
                  },
                  "Output.html#sendStop": {
                    "ref": "Output.html#sendStop",
                    "tf": 7.142857142857142
                  },
                  "Output.html#sendTuneRequest": {
                    "ref": "Output.html#sendTuneRequest",
                    "tf": 7.142857142857142
                  },
                  "Output.html#setPitchBendRange": {
                    "ref": "Output.html#setPitchBendRange",
                    "tf": 3.571428571428571
                  },
                  "OutputChannel.html#sendControlChange": {
                    "ref": "OutputChannel.html#sendControlChange",
                    "tf": 0.2890173410404624
                  },
                  "OutputChannel.html#sendKeyAftertouch": {
                    "ref": "OutputChannel.html#sendKeyAftertouch",
                    "tf": 3.125
                  },
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  },
                  "WebMidi.html#time": {
                    "ref": "WebMidi.html#time",
                    "tf": 688.0208333333334
                  },
                  "WebMidi.html#convertToTimestamp": {
                    "ref": "WebMidi.html#convertToTimestamp",
                    "tf": 51.388888888888886
                  }
                },
                "s": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "m": {
                        "docs": {},
                        "p": {
                          "docs": {
                            "Output.html#send": {
                              "ref": "Output.html#send",
                              "tf": 21.28205128205128
                            },
                            "OutputChannel.html#send": {
                              "ref": "OutputChannel.html#send",
                              "tf": 21.428571428571427
                            },
                            "WebMidi.html#convertToTimestamp": {
                              "ref": "WebMidi.html#convertToTimestamp",
                              "tf": 2.7777777777777777
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "c": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "Output.html#sendTimecodeQuarterFrame": {
                          "ref": "Output.html#sendTimecodeQuarterFrame",
                          "tf": 5
                        },
                        "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                          "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                          "tf": 0.5617977528089888
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "l": {
              "docs": {},
              "l": {
                "docs": {
                  "Output.html#sendActiveSensing": {
                    "ref": "Output.html#sendActiveSensing",
                    "tf": 2.272727272727273
                  },
                  "Output.html#sendReset": {
                    "ref": "Output.html#sendReset",
                    "tf": 3.8461538461538463
                  },
                  "Output.html#sendStop": {
                    "ref": "Output.html#sendStop",
                    "tf": 3.571428571428571
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "m": {
                "docs": {},
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 0.33333333333333337
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "e": {
              "docs": {},
              "m": {
                "docs": {},
                "o": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "v": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "l": {
                                "docs": {
                                  "Output.html#sendControlChange": {
                                    "ref": "Output.html#sendControlChange",
                                    "tf": 0.2890173410404624
                                  },
                                  "OutputChannel.html#sendControlChange": {
                                    "ref": "OutputChannel.html#sendControlChange",
                                    "tf": 0.2890173410404624
                                  },
                                  "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                    "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                    "tf": 0.4032258064516129
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "u": {
              "docs": {},
              "e": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.6666666666666667
                  },
                  "WebMidi.html#supported": {
                    "ref": "WebMidi.html#supported",
                    "tf": 3.4482758620689653
                  },
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.8571428571428572
                  }
                }
              }
            },
            "i": {
              "docs": {
                "WebMidi.html#enable": {
                  "ref": "WebMidi.html#enable",
                  "tf": 0.2857142857142857
                }
              },
              "g": {
                "docs": {},
                "g": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "WebMidi.html#MIDI_INTERFACE_EVENTS": {
                          "ref": "WebMidi.html#MIDI_INTERFACE_EVENTS",
                          "tf": 8.333333333333332
                        },
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.5714285714285714
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "n": {
              "docs": {},
              "e": {
                "docs": {
                  "Output.html#sendTuneRequest": {
                    "ref": "Output.html#sendTuneRequest",
                    "tf": 7.142857142857142
                  },
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 2.229299363057325
                  }
                }
              },
              "i": {
                "docs": {},
                "n": {
                  "docs": {},
                  "g": {
                    "docs": {},
                    "b": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "k": {
                            "docs": {
                              "Output.html#setRegisteredParameter": {
                                "ref": "Output.html#setRegisteredParameter",
                                "tf": 0.3184713375796179
                              },
                              "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                "tf": 0.78125
                              }
                            }
                          }
                        }
                      }
                    },
                    "p": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "m": {
                                  "docs": {
                                    "Output.html#setRegisteredParameter": {
                                      "ref": "Output.html#setRegisteredParameter",
                                      "tf": 0.3184713375796179
                                    },
                                    "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                      "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                      "tf": 0.78125
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "r": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "q": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "s": {
                                "docs": {},
                                "t": {
                                  "docs": {
                                    "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                                      "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                                      "tf": 0.5617977528089888
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "w": {
            "docs": {},
            "o": {
              "docs": {
                "Output.html#setRegisteredParameter": {
                  "ref": "Output.html#setRegisteredParameter",
                  "tf": 0.3184713375796179
                },
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                },
                "WebMidi.html#enable": {
                  "ref": "WebMidi.html#enable",
                  "tf": 0.2857142857142857
                }
              }
            }
          },
          "o": {
            "docs": {},
            "w": {
              "docs": {},
              "a": {
                "docs": {},
                "r": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.2857142857142857
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "w": {
          "docs": {},
          "e": {
            "docs": {},
            "b": {
              "docs": {
                "index.html": {
                  "ref": "index.html",
                  "tf": 10
                },
                "WebMidi.html": {
                  "ref": "WebMidi.html",
                  "tf": 0.8620689655172413
                },
                "WebMidi.html#interface": {
                  "ref": "WebMidi.html#interface",
                  "tf": 4.166666666666666
                },
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                },
                "WebMidi.html#supported": {
                  "ref": "WebMidi.html#supported",
                  "tf": 1.7241379310344827
                },
                "WebMidi.html#enable": {
                  "ref": "WebMidi.html#enable",
                  "tf": 0.5714285714285714
                },
                "WebMidi.html#getInputById": {
                  "ref": "WebMidi.html#getInputById",
                  "tf": 1.4705882352941175
                },
                "WebMidi.html#getOutputById": {
                  "ref": "WebMidi.html#getOutputById",
                  "tf": 1.4705882352941175
                }
              },
              "m": {
                "docs": {},
                "i": {
                  "docs": {},
                  "d": {
                    "docs": {},
                    "i": {
                      "docs": {
                        "Output.html#sendContinue": {
                          "ref": "Output.html#sendContinue",
                          "tf": 33.33333333333333
                        },
                        "WebMidi.html": {
                          "ref": "WebMidi.html",
                          "tf": 1904.3103448275863
                        },
                        "WebMidi.html#disable": {
                          "ref": "WebMidi.html#disable",
                          "tf": 2.272727272727273
                        },
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 1.1428571428571428
                        }
                      },
                      ".": {
                        "docs": {},
                        "j": {
                          "docs": {
                            "index.html": {
                              "ref": "index.html",
                              "tf": 600
                            },
                            "Input.html": {
                              "ref": "Input.html",
                              "tf": 2.083333333333333
                            },
                            "Output.html": {
                              "ref": "Output.html",
                              "tf": 2.083333333333333
                            },
                            "WebMidi.html": {
                              "ref": "WebMidi.html",
                              "tf": 0.8620689655172413
                            },
                            "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                              "tf": 1.1235955056179776
                            },
                            "WebMidi.html#sysexEnabled": {
                              "ref": "WebMidi.html#sysexEnabled",
                              "tf": 4.166666666666666
                            },
                            "WebMidi.html#disable": {
                              "ref": "WebMidi.html#disable",
                              "tf": 2.272727272727273
                            }
                          }
                        },
                        "e": {
                          "docs": {},
                          "n": {
                            "docs": {
                              "Output.html#sendSysex": {
                                "ref": "Output.html#sendSysex",
                                "tf": 0.33333333333333337
                              },
                              "WebMidi.html#enable": {
                                "ref": "WebMidi.html#enable",
                                "tf": 0.2857142857142857
                              }
                            },
                            "a": {
                              "docs": {},
                              "b": {
                                "docs": {},
                                "l": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "(": {
                                      "docs": {},
                                      "{": {
                                        "docs": {},
                                        "s": {
                                          "docs": {},
                                          "y": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "x": {
                                                  "docs": {
                                                    "Output.html#sendSysex": {
                                                      "ref": "Output.html#sendSysex",
                                                      "tf": 0.33333333333333337
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "c": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "b": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "c": {
                                                      "docs": {},
                                                      "k": {
                                                        "docs": {
                                                          "WebMidi.html#enable": {
                                                            "ref": "WebMidi.html#enable",
                                                            "tf": 0.2857142857142857
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      ")": {
                                        "docs": {},
                                        ".": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "h": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "n": {
                                                  "docs": {},
                                                  "(": {
                                                    "docs": {},
                                                    "p": {
                                                      "docs": {},
                                                      "o": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "t": {
                                                            "docs": {
                                                              "WebMidi.html#enable": {
                                                                "ref": "WebMidi.html#enable",
                                                                "tf": 0.2857142857142857
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "o": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "p": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "s": {
                                      "docs": {},
                                      "[": {
                                        "0": {
                                          "docs": {},
                                          "]": {
                                            "docs": {},
                                            ".": {
                                              "docs": {},
                                              "s": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "n": {
                                                    "docs": {},
                                                    "d": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {},
                                                        "y": {
                                                          "docs": {},
                                                          "s": {
                                                            "docs": {},
                                                            "e": {
                                                              "docs": {},
                                                              "x": {
                                                                "docs": {},
                                                                "(": {
                                                                  "0": {
                                                                    "docs": {},
                                                                    "x": {
                                                                      "4": {
                                                                        "2": {
                                                                          "docs": {
                                                                            "Output.html#sendSysex": {
                                                                              "ref": "Output.html#sendSysex",
                                                                              "tf": 0.33333333333333337
                                                                            }
                                                                          }
                                                                        },
                                                                        "docs": {}
                                                                      },
                                                                      "docs": {}
                                                                    }
                                                                  },
                                                                  "6": {
                                                                    "6": {
                                                                      "docs": {
                                                                        "Output.html#sendSysex": {
                                                                          "ref": "Output.html#sendSysex",
                                                                          "tf": 0.33333333333333337
                                                                        }
                                                                      }
                                                                    },
                                                                    "docs": {}
                                                                  },
                                                                  "docs": {},
                                                                  "[": {
                                                                    "0": {
                                                                      "docs": {},
                                                                      "x": {
                                                                        "0": {
                                                                          "0": {
                                                                            "docs": {
                                                                              "Output.html#sendSysex": {
                                                                                "ref": "Output.html#sendSysex",
                                                                                "tf": 0.33333333333333337
                                                                              }
                                                                            }
                                                                          },
                                                                          "docs": {}
                                                                        },
                                                                        "docs": {}
                                                                      }
                                                                    },
                                                                    "docs": {}
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "docs": {}
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "a": {
                          "docs": {},
                          "d": {
                            "docs": {},
                            "d": {
                              "docs": {},
                              "l": {
                                "docs": {},
                                "i": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "(": {
                                                "docs": {},
                                                "\"": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "n": {
                                                      "docs": {
                                                        "WebMidi.html#enable": {
                                                          "ref": "WebMidi.html#enable",
                                                          "tf": 0.2857142857142857
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "#": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "p": {
                              "docs": {},
                              "u": {
                                "docs": {},
                                "t": {
                                  "docs": {
                                    "Input.html": {
                                      "ref": "Input.html",
                                      "tf": 2.083333333333333
                                    },
                                    "WebMidi.html#inputs": {
                                      "ref": "WebMidi.html#inputs",
                                      "tf": 1150
                                    }
                                  }
                                }
                              }
                            },
                            "t": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "f": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "c": {
                                        "docs": {
                                          "WebMidi.html#interface": {
                                            "ref": "WebMidi.html#interface",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "o": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "p": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "Output.html": {
                                        "ref": "Output.html",
                                        "tf": 2.083333333333333
                                      },
                                      "WebMidi.html#outputs": {
                                        "ref": "WebMidi.html#outputs",
                                        "tf": 1150
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "c": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "v": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "f": {
                                        "docs": {},
                                        "f": {
                                          "docs": {},
                                          "s": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "WebMidi.html#octaveOffset": {
                                                    "ref": "WebMidi.html#octaveOffset",
                                                    "tf": 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "e": {
                          "docs": {},
                          "n": {
                            "docs": {
                              "WebMidi.html#enabled": {
                                "ref": "WebMidi.html#enabled",
                                "tf": 1150
                              },
                              "WebMidi.html#enable": {
                                "ref": "WebMidi.html#enable",
                                "tf": 1150
                              }
                            }
                          }
                        },
                        "m": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "d": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "_": {
                                  "docs": {},
                                  "c": {
                                    "docs": {},
                                    "h": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "n": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "_": {
                                                  "docs": {},
                                                  "m": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {},
                                                        "s": {
                                                          "docs": {},
                                                          "a": {
                                                            "docs": {},
                                                            "g": {
                                                              "docs": {
                                                                "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                                                                  "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                                                                  "tf": 1150
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    },
                                                    "o": {
                                                      "docs": {},
                                                      "d": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "_": {
                                                            "docs": {},
                                                            "m": {
                                                              "docs": {},
                                                              "e": {
                                                                "docs": {},
                                                                "s": {
                                                                  "docs": {},
                                                                  "s": {
                                                                    "docs": {},
                                                                    "a": {
                                                                      "docs": {},
                                                                      "g": {
                                                                        "docs": {
                                                                          "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                                                                            "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                                                                            "tf": 1150
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  },
                                                  "v": {
                                                    "docs": {},
                                                    "o": {
                                                      "docs": {},
                                                      "i": {
                                                        "docs": {},
                                                        "c": {
                                                          "docs": {},
                                                          "e": {
                                                            "docs": {},
                                                            "_": {
                                                              "docs": {},
                                                              "m": {
                                                                "docs": {},
                                                                "e": {
                                                                  "docs": {},
                                                                  "s": {
                                                                    "docs": {},
                                                                    "s": {
                                                                      "docs": {},
                                                                      "a": {
                                                                        "docs": {},
                                                                        "g": {
                                                                          "docs": {
                                                                            "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                                                                              "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                                                                              "tf": 1150
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "o": {
                                      "docs": {},
                                      "n": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "_": {
                                                  "docs": {},
                                                  "c": {
                                                    "docs": {},
                                                    "h": {
                                                      "docs": {},
                                                      "a": {
                                                        "docs": {},
                                                        "n": {
                                                          "docs": {},
                                                          "g": {
                                                            "docs": {},
                                                            "e": {
                                                              "docs": {},
                                                              "_": {
                                                                "docs": {},
                                                                "m": {
                                                                  "docs": {},
                                                                  "e": {
                                                                    "docs": {},
                                                                    "s": {
                                                                      "docs": {},
                                                                      "s": {
                                                                        "docs": {},
                                                                        "a": {
                                                                          "docs": {},
                                                                          "g": {
                                                                            "docs": {
                                                                              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                                                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                                                "tf": 1150
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "i": {
                                    "docs": {},
                                    "n": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "f": {
                                              "docs": {},
                                              "a": {
                                                "docs": {},
                                                "c": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "_": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "v": {
                                                          "docs": {
                                                            "WebMidi.html#MIDI_INTERFACE_EVENTS": {
                                                              "ref": "WebMidi.html#MIDI_INTERFACE_EVENTS",
                                                              "tf": 1150
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "n": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "p": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "_": {
                                            "docs": {},
                                            "m": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "a": {
                                                      "docs": {},
                                                      "g": {
                                                        "docs": {
                                                          "WebMidi.html#MIDI_NRPN_MESSAGES": {
                                                            "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                                                            "tf": 1150
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "r": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "s": {
                                            "docs": {},
                                            "t": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "d": {
                                                      "docs": {},
                                                      "_": {
                                                        "docs": {},
                                                        "p": {
                                                          "docs": {},
                                                          "a": {
                                                            "docs": {},
                                                            "r": {
                                                              "docs": {},
                                                              "a": {
                                                                "docs": {},
                                                                "m": {
                                                                  "docs": {},
                                                                  "e": {
                                                                    "docs": {},
                                                                    "t": {
                                                                      "docs": {
                                                                        "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                                                          "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                                                          "tf": 1150
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "s": {
                                    "docs": {},
                                    "y": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "m": {
                                              "docs": {},
                                              "_": {
                                                "docs": {},
                                                "m": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "s": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {},
                                                        "a": {
                                                          "docs": {},
                                                          "g": {
                                                            "docs": {
                                                              "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                                                                "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                                                                "tf": 1150
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "n": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "WebMidi.html#NOTES": {
                                  "ref": "WebMidi.html#NOTES",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        },
                        "s": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "p": {
                              "docs": {},
                              "p": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "t": {
                                      "docs": {
                                        "WebMidi.html#supported": {
                                          "ref": "WebMidi.html#supported",
                                          "tf": 1150
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "y": {
                            "docs": {},
                            "s": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "x": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "n": {
                                      "docs": {
                                        "WebMidi.html#sysexEnabled": {
                                          "ref": "WebMidi.html#sysexEnabled",
                                          "tf": 1150
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "a": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "z": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "c": {
                                          "docs": {},
                                          "h": {
                                            "docs": {},
                                            "a": {
                                              "docs": {},
                                              "n": {
                                                "docs": {},
                                                "n": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "l": {
                                                      "docs": {
                                                        "WebMidi.html#sanitizeChannels": {
                                                          "ref": "WebMidi.html#sanitizeChannels",
                                                          "tf": 1150
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "t": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "m": {
                              "docs": {
                                "WebMidi.html#time": {
                                  "ref": "WebMidi.html#time",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        },
                        "c": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "v": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "m": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "t": {
                                                      "docs": {},
                                                      "a": {
                                                        "docs": {},
                                                        "m": {
                                                          "docs": {},
                                                          "p": {
                                                            "docs": {
                                                              "WebMidi.html#convertToTimestamp": {
                                                                "ref": "WebMidi.html#convertToTimestamp",
                                                                "tf": 1150
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "d": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "s": {
                              "docs": {
                                "WebMidi.html#disable": {
                                  "ref": "WebMidi.html#disable",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        },
                        "g": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "p": {
                                    "docs": {},
                                    "u": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "b": {
                                          "docs": {},
                                          "y": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "d": {
                                                "docs": {
                                                  "WebMidi.html#getInputById": {
                                                    "ref": "WebMidi.html#getInputById",
                                                    "tf": 1150
                                                  }
                                                }
                                              }
                                            },
                                            "n": {
                                              "docs": {},
                                              "a": {
                                                "docs": {},
                                                "m": {
                                                  "docs": {
                                                    "WebMidi.html#getInputByName": {
                                                      "ref": "WebMidi.html#getInputByName",
                                                      "tf": 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "n": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "n": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "m": {
                                            "docs": {},
                                            "b": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "b": {
                                                    "docs": {},
                                                    "y": {
                                                      "docs": {},
                                                      "n": {
                                                        "docs": {},
                                                        "a": {
                                                          "docs": {},
                                                          "m": {
                                                            "docs": {
                                                              "WebMidi.html#getNoteNumberByName": {
                                                                "ref": "WebMidi.html#getNoteNumberByName",
                                                                "tf": 1150
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "o": {
                                "docs": {},
                                "c": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "v": {
                                        "docs": {
                                          "WebMidi.html#getOctave": {
                                            "ref": "WebMidi.html#getOctave",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "u": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "p": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "b": {
                                            "docs": {},
                                            "y": {
                                              "docs": {},
                                              "i": {
                                                "docs": {},
                                                "d": {
                                                  "docs": {
                                                    "WebMidi.html#getOutputById": {
                                                      "ref": "WebMidi.html#getOutputById",
                                                      "tf": 1150
                                                    }
                                                  }
                                                }
                                              },
                                              "n": {
                                                "docs": {},
                                                "a": {
                                                  "docs": {},
                                                  "m": {
                                                    "docs": {
                                                      "WebMidi.html#getOutputByName": {
                                                        "ref": "WebMidi.html#getOutputByName",
                                                        "tf": 1150
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "u": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "s": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "n": {
                                            "docs": {},
                                            "u": {
                                              "docs": {},
                                              "m": {
                                                "docs": {},
                                                "b": {
                                                  "docs": {
                                                    "WebMidi.html#guessNoteNumber": {
                                                      "ref": "WebMidi.html#guessNoteNumber",
                                                      "tf": 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "a": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "s": {
                              "docs": {},
                              "h": {
                                "docs": {},
                                "i": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    ".": {
                                      "docs": {},
                                      "j": {
                                        "docs": {
                                          "WebMidi.html#supported": {
                                            "ref": "WebMidi.html#supported",
                                            "tf": 1.7241379310344827
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "e": {
              "docs": {},
              "t": {
                "docs": {},
                "h": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "Input.html#nrpnEventsEnabled": {
                          "ref": "Input.html#nrpnEventsEnabled",
                          "tf": 1.0869565217391304
                        },
                        "WebMidi.html#enabled": {
                          "ref": "WebMidi.html#enabled",
                          "tf": 7.142857142857142
                        },
                        "WebMidi.html#supported": {
                          "ref": "WebMidi.html#supported",
                          "tf": 1.7241379310344827
                        },
                        "WebMidi.html#sysexEnabled": {
                          "ref": "WebMidi.html#sysexEnabled",
                          "tf": 4.166666666666666
                        }
                      }
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "s": {
                "docs": {},
                "e": {
                  "docs": {
                    "WebMidi.html#getInputByName": {
                      "ref": "WebMidi.html#getInputByName",
                      "tf": 2
                    },
                    "WebMidi.html#getOutputByName": {
                      "ref": "WebMidi.html#getOutputByName",
                      "tf": 2
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "d": {
              "docs": {},
              "e": {
                "docs": {
                  "Input.html#nrpnEventsEnabled": {
                    "ref": "Input.html#nrpnEventsEnabled",
                    "tf": 1.0869565217391304
                  },
                  "Output.html#sendKeyAftertouch": {
                    "ref": "Output.html#sendKeyAftertouch",
                    "tf": 2.7777777777777777
                  },
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  },
                  "OutputChannel.html#sendKeyAftertouch": {
                    "ref": "OutputChannel.html#sendKeyAftertouch",
                    "tf": 3.125
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "r": {
              "docs": {},
              "n": {
                "docs": {
                  "Output.html#clear": {
                    "ref": "Output.html#clear",
                    "tf": 3.8461538461538463
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "t": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "t": {
                "docs": {
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.2857142857142857
                  }
                }
              }
            },
            "y": {
              "docs": {
                "WebMidi.html#enable": {
                  "ref": "WebMidi.html#enable",
                  "tf": 0.2857142857142857
                },
                "WebMidi.html#getInputByName": {
                  "ref": "WebMidi.html#getInputByName",
                  "tf": 2
                },
                "WebMidi.html#getOutputByName": {
                  "ref": "WebMidi.html#getOutputByName",
                  "tf": 2
                }
              }
            }
          },
          "o": {
            "docs": {},
            "r": {
              "docs": {},
              "k": {
                "docs": {
                  "Output.html#clear": {
                    "ref": "Output.html#clear",
                    "tf": 3.8461538461538463
                  },
                  "WebMidi.html": {
                    "ref": "WebMidi.html",
                    "tf": 0.8620689655172413
                  }
                }
              }
            }
          }
        },
        "d": {
          "docs": {
            "WebMidi.html#getNoteNumberByName": {
              "ref": "WebMidi.html#getNoteNumberByName",
              "tf": 0.5681818181818182
            },
            "WebMidi.html#guessNoteNumber": {
              "ref": "WebMidi.html#guessNoteNumber",
              "tf": 1.25
            }
          },
          "o": {
            "docs": {
              "WebMidi.html#interface": {
                "ref": "WebMidi.html#interface",
                "tf": 4.166666666666666
              }
            },
            "c": {
              "docs": {},
              "u": {
                "docs": {},
                "m": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "global.html": {
                            "ref": "global.html",
                            "tf": 35
                          },
                          "list_class.html": {
                            "ref": "list_class.html",
                            "tf": 35
                          },
                          "WebMidi.html#convertToTimestamp": {
                            "ref": "WebMidi.html#convertToTimestamp",
                            "tf": 1.3888888888888888
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "e": {
                "docs": {
                  "Output.html#sendTimecodeQuarterFrame": {
                    "ref": "Output.html#sendTimecodeQuarterFrame",
                    "tf": 2.5
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "h": {
                "docs": {},
                "i": {
                  "docs": {},
                  "g": {
                    "docs": {},
                    "h": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "m": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "s": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "m": {
                                            "docs": {},
                                            "p": {
                                              "docs": {
                                                "WebMidi.html#time": {
                                                  "ref": "WebMidi.html#time",
                                                  "tf": 33.33333333333333
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "u": {
              "docs": {},
              "b": {
                "docs": {},
                "l": {
                  "docs": {
                    "WebMidi.html#getNoteNumberByName": {
                      "ref": "WebMidi.html#getNoteNumberByName",
                      "tf": 1.1363636363636365
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "r": {
              "docs": {},
              "i": {
                "docs": {},
                "v": {
                  "docs": {
                    "Input.html": {
                      "ref": "Input.html",
                      "tf": 2.083333333333333
                    },
                    "Output.html": {
                      "ref": "Output.html",
                      "tf": 2.083333333333333
                    },
                    "WebMidi.html#convertToTimestamp": {
                      "ref": "WebMidi.html#convertToTimestamp",
                      "tf": 1.3888888888888888
                    }
                  }
                }
              }
            },
            "v": {
              "docs": {},
              "i": {
                "docs": {},
                "c": {
                  "docs": {
                    "Input.html#manufacturer": {
                      "ref": "Input.html#manufacturer",
                      "tf": 7.142857142857142
                    },
                    "Output.html#manufacturer": {
                      "ref": "Output.html#manufacturer",
                      "tf": 7.142857142857142
                    },
                    "Output.html#sendActiveSensing": {
                      "ref": "Output.html#sendActiveSensing",
                      "tf": 2.272727272727273
                    },
                    "Output.html#sendReset": {
                      "ref": "Output.html#sendReset",
                      "tf": 3.8461538461538463
                    },
                    "Output.html#sendSongSelect": {
                      "ref": "Output.html#sendSongSelect",
                      "tf": 3.571428571428571
                    },
                    "Output.html#sendStop": {
                      "ref": "Output.html#sendStop",
                      "tf": 3.571428571428571
                    },
                    "Output.html#sendSysex": {
                      "ref": "Output.html#sendSysex",
                      "tf": 1
                    }
                  }
                }
              },
              "e": {
                "docs": {},
                "l": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "p": {
                      "docs": {
                        "Output.html#sendTimecodeQuarterFrame": {
                          "ref": "Output.html#sendTimecodeQuarterFrame",
                          "tf": 2.5
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "y": {
                      "docs": {
                        "Input.html#destroy": {
                          "ref": "Input.html#destroy",
                          "tf": 683.3333333333334
                        },
                        "Output.html#destroy": {
                          "ref": "Output.html#destroy",
                          "tf": 683.3333333333334
                        },
                        "WebMidi.html#disable": {
                          "ref": "WebMidi.html#disable",
                          "tf": 4.545454545454546
                        }
                      }
                    }
                  }
                }
              },
              "i": {
                "docs": {},
                "r": {
                  "docs": {
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.3184713375796179
                    },
                    "WebMidi.html#getOctave": {
                      "ref": "WebMidi.html#getOctave",
                      "tf": 1.282051282051282
                    }
                  }
                }
              }
            },
            "f": {
              "docs": {},
              "i": {
                "docs": {},
                "n": {
                  "docs": {
                    "Output.html#clear": {
                      "ref": "Output.html#clear",
                      "tf": 3.8461538461538463
                    },
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.3184713375796179
                    }
                  }
                }
              },
              "a": {
                "docs": {},
                "u": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Output.html#sendReset": {
                          "ref": "Output.html#sendReset",
                          "tf": 3.8461538461538463
                        },
                        "WebMidi.html#octaveOffset": {
                          "ref": "WebMidi.html#octaveOffset",
                          "tf": 1.3513513513513513
                        },
                        "WebMidi.html#getOctave": {
                          "ref": "WebMidi.html#getOctave",
                          "tf": 1.282051282051282
                        }
                      }
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "i": {
                "docs": {},
                "v": {
                  "docs": {
                    "Output.html#clear": {
                      "ref": "Output.html#clear",
                      "tf": 3.8461538461538463
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "a": {
                "docs": {},
                "i": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "Output.html#send": {
                        "ref": "Output.html#send",
                        "tf": 2.564102564102564
                      },
                      "OutputChannel.html#send": {
                        "ref": "OutputChannel.html#send",
                        "tf": 2.857142857142857
                      },
                      "OutputChannel.html#sendControlChange": {
                        "ref": "OutputChannel.html#sendControlChange",
                        "tf": 0.2890173410404624
                      }
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "i": {
                "docs": {},
                "m": {
                  "docs": {
                    "Output.html#sendSysex": {
                      "ref": "Output.html#sendSysex",
                      "tf": 0.6666666666666667
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "m": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "WebMidi.html#MIDI_NRPN_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                              "tf": 2
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "e": {
                "docs": {},
                "n": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 0.33333333333333337
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "c": {
                    "docs": {
                      "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                        "tf": 3.571428571428571
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "r": {
              "docs": {},
              "e": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "Input.html": {
                            "ref": "Input.html",
                            "tf": 2.083333333333333
                          },
                          "Output.html": {
                            "ref": "Output.html",
                            "tf": 2.083333333333333
                          },
                          "Output.html#send": {
                            "ref": "Output.html#send",
                            "tf": 1.282051282051282
                          },
                          "OutputChannel.html#send": {
                            "ref": "OutputChannel.html#send",
                            "tf": 1.4285714285714286
                          },
                          "WebMidi.html": {
                            "ref": "WebMidi.html",
                            "tf": 0.8620689655172413
                          },
                          "WebMidi.html#interface": {
                            "ref": "WebMidi.html#interface",
                            "tf": 4.166666666666666
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "f": {
              "docs": {},
              "f": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "Input.html#id": {
                        "ref": "Input.html#id",
                        "tf": 4.3478260869565215
                      },
                      "Output.html#id": {
                        "ref": "Output.html#id",
                        "tf": 4.3478260869565215
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "c": {
                "docs": {},
                "a": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "Input.html#nrpnEventsEnabled": {
                          "ref": "Input.html#nrpnEventsEnabled",
                          "tf": 1.0869565217391304
                        }
                      }
                    }
                  }
                },
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "c": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "Input.html#state": {
                                "ref": "Input.html#state",
                                "tf": 10
                              },
                              "Output.html#state": {
                                "ref": "Output.html#state",
                                "tf": 10
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "p": {
                "docs": {},
                "a": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "h": {
                        "docs": {
                          "Input.html#nrpnEventsEnabled": {
                            "ref": "Input.html#nrpnEventsEnabled",
                            "tf": 1.0869565217391304
                          }
                        }
                      }
                    }
                  }
                },
                "l": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "y": {
                      "docs": {
                        "Output.html#sendSongSelect": {
                          "ref": "Output.html#sendSongSelect",
                          "tf": 3.571428571428571
                        },
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.2857142857142857
                        }
                      }
                    }
                  }
                }
              },
              "t": {
                "docs": {},
                "a": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "c": {
                      "docs": {
                        "Output.html#setRegisteredParameter": {
                          "ref": "Output.html#setRegisteredParameter",
                          "tf": 1.2738853503184715
                        }
                      },
                      "e": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "o": {
                                  "docs": {
                                    "Output.html#setRegisteredParameter": {
                                      "ref": "Output.html#setRegisteredParameter",
                                      "tf": 0.3184713375796179
                                    },
                                    "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                      "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                      "tf": 0.78125
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "a": {
                "docs": {},
                "b": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "WebMidi.html#disable": {
                        "ref": "WebMidi.html#disable",
                        "tf": 685.6060606060606
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "t": {
              "docs": {},
              "a": {
                "docs": {
                  "Output.html#send": {
                    "ref": "Output.html#send",
                    "tf": 20
                  },
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 20.333333333333332
                  },
                  "Output.html#sendTimecodeQuarterFrame": {
                    "ref": "Output.html#sendTimecodeQuarterFrame",
                    "tf": 5
                  },
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 16.98513800424628
                  },
                  "OutputChannel.html#send": {
                    "ref": "OutputChannel.html#send",
                    "tf": 20
                  }
                },
                "b": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "d": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "c": {
                                  "docs": {},
                                  "r": {
                                    "docs": {
                                      "Output.html#sendControlChange": {
                                        "ref": "Output.html#sendControlChange",
                                        "tf": 0.2890173410404624
                                      },
                                      "OutputChannel.html#sendControlChange": {
                                        "ref": "OutputChannel.html#sendControlChange",
                                        "tf": 0.2890173410404624
                                      },
                                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                        "tf": 0.4032258064516129
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "i": {
                              "docs": {},
                              "n": {
                                "docs": {},
                                "c": {
                                  "docs": {},
                                  "r": {
                                    "docs": {
                                      "Output.html#sendControlChange": {
                                        "ref": "Output.html#sendControlChange",
                                        "tf": 0.2890173410404624
                                      },
                                      "OutputChannel.html#sendControlChange": {
                                        "ref": "OutputChannel.html#sendControlChange",
                                        "tf": 0.2890173410404624
                                      },
                                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                        "tf": 0.4032258064516129
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "y": {
                          "docs": {},
                          "c": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "s": {
                                    "docs": {
                                      "Output.html#sendControlChange": {
                                        "ref": "Output.html#sendControlChange",
                                        "tf": 0.2890173410404624
                                      },
                                      "OutputChannel.html#sendControlChange": {
                                        "ref": "OutputChannel.html#sendControlChange",
                                        "tf": 0.2890173410404624
                                      },
                                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                        "tf": 0.4032258064516129
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "f": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "n": {
                                "docs": {
                                  "Output.html#sendControlChange": {
                                    "ref": "Output.html#sendControlChange",
                                    "tf": 0.2890173410404624
                                  },
                                  "OutputChannel.html#sendControlChange": {
                                    "ref": "OutputChannel.html#sendControlChange",
                                    "tf": 0.2890173410404624
                                  },
                                  "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                    "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                    "tf": 0.4032258064516129
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "j": {
            "docs": {},
            "i": {
              "docs": {},
              "p": {
                "docs": {},
                "e": {
                  "docs": {},
                  "v": {
                    "docs": {
                      "WebMidi.html": {
                        "ref": "WebMidi.html",
                        "tf": 0.8620689655172413
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "e": {
              "docs": {
                "WebMidi.html#time": {
                  "ref": "WebMidi.html#time",
                  "tf": 1.5625
                }
              }
            }
          }
        },
        "g": {
          "4": {
            "docs": {
              "WebMidi.html#getNoteNumberByName": {
                "ref": "WebMidi.html#getNoteNumberByName",
                "tf": 0.5681818181818182
              }
            }
          },
          "8": {
            "docs": {
              "WebMidi.html#guessNoteNumber": {
                "ref": "WebMidi.html#guessNoteNumber",
                "tf": 1.25
              }
            }
          },
          "docs": {},
          "l": {
            "docs": {},
            "o": {
              "docs": {},
              "b": {
                "docs": {},
                "a": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "global.html": {
                        "ref": "global.html",
                        "tf": 2045
                      },
                      "WebMidi.html": {
                        "ref": "WebMidi.html",
                        "tf": 0.8620689655172413
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {
              "Output.html#setRegisteredParameter": {
                "ref": "Output.html#setRegisteredParameter",
                "tf": 0.3184713375796179
              }
            },
            "o": {
              "docs": {},
              "g": {
                "docs": {},
                "l": {
                  "docs": {
                    "Input.html#id": {
                      "ref": "Input.html#id",
                      "tf": 2.1739130434782608
                    },
                    "Output.html#id": {
                      "ref": "Output.html#id",
                      "tf": 2.1739130434782608
                    }
                  }
                }
              },
              "d": {
                "docs": {
                  "Output.html#sendActiveSensing": {
                    "ref": "Output.html#sendActiveSensing",
                    "tf": 2.272727272727273
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "t": {
              "docs": {},
              "c": {
                "docs": {},
                "c": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "m": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "b": {
                            "docs": {},
                            "y": {
                              "docs": {},
                              "n": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    "b": {
                                      "docs": {
                                        "Input.html#getCcNameByNumber": {
                                          "ref": "Input.html#getCcNameByNumber",
                                          "tf": 683.3333333333334
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "h": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "m": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "d": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "b": {
                                      "docs": {},
                                      "y": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "u": {
                                            "docs": {},
                                            "m": {
                                              "docs": {},
                                              "b": {
                                                "docs": {
                                                  "Input.html#getChannelModeByNumber": {
                                                    "ref": "Input.html#getChannelModeByNumber",
                                                    "tf": 683.3333333333334
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "i": {
                "docs": {},
                "n": {
                  "docs": {},
                  "p": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "b": {
                          "docs": {},
                          "y": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "d": {
                                "docs": {
                                  "WebMidi.html#getInputById": {
                                    "ref": "WebMidi.html#getInputById",
                                    "tf": 683.3333333333334
                                  }
                                }
                              }
                            },
                            "n": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "m": {
                                  "docs": {
                                    "WebMidi.html#getInputByName": {
                                      "ref": "WebMidi.html#getInputByName",
                                      "tf": 683.3333333333334
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "n": {
                "docs": {},
                "o": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "u": {
                          "docs": {},
                          "m": {
                            "docs": {},
                            "b": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "b": {
                                    "docs": {},
                                    "y": {
                                      "docs": {},
                                      "n": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "m": {
                                            "docs": {
                                              "WebMidi.html#getNoteNumberByName": {
                                                "ref": "WebMidi.html#getNoteNumberByName",
                                                "tf": 683.3333333333334
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "o": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "v": {
                        "docs": {
                          "WebMidi.html#getOctave": {
                            "ref": "WebMidi.html#getOctave",
                            "tf": 683.3333333333334
                          }
                        }
                      }
                    }
                  }
                },
                "u": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "p": {
                      "docs": {},
                      "u": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "b": {
                            "docs": {},
                            "y": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "d": {
                                  "docs": {
                                    "WebMidi.html#getOutputById": {
                                      "ref": "WebMidi.html#getOutputById",
                                      "tf": 683.3333333333334
                                    }
                                  }
                                }
                              },
                              "n": {
                                "docs": {},
                                "a": {
                                  "docs": {},
                                  "m": {
                                    "docs": {
                                      "WebMidi.html#getOutputByName": {
                                        "ref": "WebMidi.html#getOutputByName",
                                        "tf": 683.3333333333334
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "Output.html#sendSysex": {
                      "ref": "Output.html#sendSysex",
                      "tf": 1
                    }
                  },
                  "a": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "p": {
                        "docs": {},
                        "u": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "p": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "b": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "n": {
                                                "1": {
                                                  "docs": {
                                                    "Output.html#sendControlChange": {
                                                      "ref": "Output.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "OutputChannel.html#sendControlChange": {
                                                      "ref": "OutputChannel.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                      "tf": 0.4032258064516129
                                                    }
                                                  }
                                                },
                                                "2": {
                                                  "docs": {
                                                    "Output.html#sendControlChange": {
                                                      "ref": "Output.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "OutputChannel.html#sendControlChange": {
                                                      "ref": "OutputChannel.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                      "tf": 0.4032258064516129
                                                    }
                                                  }
                                                },
                                                "3": {
                                                  "docs": {
                                                    "Output.html#sendControlChange": {
                                                      "ref": "Output.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "OutputChannel.html#sendControlChange": {
                                                      "ref": "OutputChannel.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                      "tf": 0.4032258064516129
                                                    }
                                                  }
                                                },
                                                "4": {
                                                  "docs": {
                                                    "Output.html#sendControlChange": {
                                                      "ref": "Output.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "OutputChannel.html#sendControlChange": {
                                                      "ref": "OutputChannel.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                      "tf": 0.4032258064516129
                                                    }
                                                  }
                                                },
                                                "docs": {}
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "s": {
                                      "docs": {},
                                      "l": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "d": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "r": {
                                                "1": {
                                                  "docs": {
                                                    "Output.html#sendControlChange": {
                                                      "ref": "Output.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "OutputChannel.html#sendControlChange": {
                                                      "ref": "OutputChannel.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                      "tf": 0.4032258064516129
                                                    }
                                                  }
                                                },
                                                "2": {
                                                  "docs": {
                                                    "Output.html#sendControlChange": {
                                                      "ref": "Output.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "OutputChannel.html#sendControlChange": {
                                                      "ref": "OutputChannel.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                      "tf": 0.4032258064516129
                                                    }
                                                  }
                                                },
                                                "3": {
                                                  "docs": {
                                                    "Output.html#sendControlChange": {
                                                      "ref": "Output.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "OutputChannel.html#sendControlChange": {
                                                      "ref": "OutputChannel.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                      "tf": 0.4032258064516129
                                                    }
                                                  }
                                                },
                                                "4": {
                                                  "docs": {
                                                    "Output.html#sendControlChange": {
                                                      "ref": "Output.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "OutputChannel.html#sendControlChange": {
                                                      "ref": "OutputChannel.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                      "tf": 0.4032258064516129
                                                    }
                                                  }
                                                },
                                                "docs": {}
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {
              "Output.html#sendSysex": {
                "ref": "Output.html#sendSysex",
                "tf": 0.33333333333333337
              },
              "WebMidi.html#enable": {
                "ref": "WebMidi.html#enable",
                "tf": 0.8571428571428572
              }
            }
          },
          "a": {
            "docs": {},
            "i": {
              "docs": {},
              "n": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.9554140127388535
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 0.78125
                  }
                }
              }
            }
          },
          "b": {
            "7": {
              "docs": {
                "WebMidi.html#getNoteNumberByName": {
                  "ref": "WebMidi.html#getNoteNumberByName",
                  "tf": 0.5681818181818182
                }
              }
            },
            "docs": {}
          },
          "i": {
            "docs": {},
            "v": {
              "docs": {},
              "e": {
                "docs": {},
                "n": {
                  "docs": {
                    "WebMidi.html#guessNoteNumber": {
                      "ref": "WebMidi.html#guessNoteNumber",
                      "tf": 1.25
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "e": {
              "docs": {},
              "s": {
                "docs": {},
                "s": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "u": {
                              "docs": {},
                              "m": {
                                "docs": {},
                                "b": {
                                  "docs": {
                                    "WebMidi.html#guessNoteNumber": {
                                      "ref": "WebMidi.html#guessNoteNumber",
                                      "tf": 683.3333333333334
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "c": {
          "3": {
            "docs": {
              "WebMidi.html#octaveOffset": {
                "ref": "WebMidi.html#octaveOffset",
                "tf": 1.3513513513513513
              },
              "WebMidi.html#guessNoteNumber": {
                "ref": "WebMidi.html#guessNoteNumber",
                "tf": 1.25
              }
            }
          },
          "4": {
            "docs": {
              "WebMidi.html#octaveOffset": {
                "ref": "WebMidi.html#octaveOffset",
                "tf": 1.3513513513513513
              },
              "WebMidi.html#getNoteNumberByName": {
                "ref": "WebMidi.html#getNoteNumberByName",
                "tf": 1.1363636363636365
              },
              "WebMidi.html#getOctave": {
                "ref": "WebMidi.html#getOctave",
                "tf": 1.282051282051282
              }
            }
          },
          "5": {
            "docs": {
              "WebMidi.html#getNoteNumberByName": {
                "ref": "WebMidi.html#getNoteNumberByName",
                "tf": 0.5681818181818182
              }
            }
          },
          "6": {
            "docs": {
              "WebMidi.html#octaveOffset": {
                "ref": "WebMidi.html#octaveOffset",
                "tf": 1.3513513513513513
              }
            }
          },
          "docs": {
            "WebMidi.html#octaveOffset": {
              "ref": "WebMidi.html#octaveOffset",
              "tf": 1.3513513513513513
            },
            "WebMidi.html#getNoteNumberByName": {
              "ref": "WebMidi.html#getNoteNumberByName",
              "tf": 0.5681818181818182
            },
            "WebMidi.html#getOctave": {
              "ref": "WebMidi.html#getOctave",
              "tf": 1.282051282051282
            }
          },
          "l": {
            "docs": {},
            "a": {
              "docs": {},
              "s": {
                "docs": {},
                "s": {
                  "docs": {
                    "list_class.html": {
                      "ref": "list_class.html",
                      "tf": 635
                    },
                    "Input.html": {
                      "ref": "Input.html",
                      "tf": 114.16666666666667
                    },
                    "InputChannel.html": {
                      "ref": "InputChannel.html",
                      "tf": 135
                    },
                    "Output.html": {
                      "ref": "Output.html",
                      "tf": 114.16666666666667
                    },
                    "OutputChannel.html": {
                      "ref": "OutputChannel.html",
                      "tf": 135
                    },
                    "WebMidi.html": {
                      "ref": "WebMidi.html",
                      "tf": 111.72413793103448
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "s": {
                "docs": {},
                "e": {
                  "docs": {
                    "Input.html#connection": {
                      "ref": "Input.html#connection",
                      "tf": 7.142857142857142
                    },
                    "Output.html#connection": {
                      "ref": "Output.html#connection",
                      "tf": 7.142857142857142
                    },
                    "Output.html#close": {
                      "ref": "Output.html#close",
                      "tf": 695.8333333333334
                    }
                  }
                }
              },
              "c": {
                "docs": {},
                "k": {
                  "docs": {
                    "Output.html#sendClock": {
                      "ref": "Output.html#sendClock",
                      "tf": 7.6923076923076925
                    },
                    "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                      "tf": 0.5617977528089888
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "a": {
                "docs": {},
                "r": {
                  "docs": {
                    "Output.html#clear": {
                      "ref": "Output.html#clear",
                      "tf": 703.8461538461538
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "n": {
              "docs": {},
              "n": {
                "docs": {},
                "e": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Input.html#connection": {
                          "ref": "Input.html#connection",
                          "tf": 690.4761904761905
                        },
                        "Input.html#state": {
                          "ref": "Input.html#state",
                          "tf": 10
                        },
                        "Output.html#connection": {
                          "ref": "Output.html#connection",
                          "tf": 690.4761904761905
                        },
                        "Output.html#state": {
                          "ref": "Output.html#state",
                          "tf": 10
                        },
                        "Output.html#sendActiveSensing": {
                          "ref": "Output.html#sendActiveSensing",
                          "tf": 4.545454545454546
                        },
                        "Output.html#sendReset": {
                          "ref": "Output.html#sendReset",
                          "tf": 3.8461538461538463
                        },
                        "Output.html#sendStop": {
                          "ref": "Output.html#sendStop",
                          "tf": 3.571428571428571
                        },
                        "Output.html#sendSysex": {
                          "ref": "Output.html#sendSysex",
                          "tf": 0.33333333333333337
                        },
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.5714285714285714
                        }
                      }
                    }
                  }
                }
              },
              "t": {
                "docs": {},
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "Input.html#nrpnEventsEnabled": {
                          "ref": "Input.html#nrpnEventsEnabled",
                          "tf": 4.3478260869565215
                        },
                        "Input.html#getCcNameByNumber": {
                          "ref": "Input.html#getCcNameByNumber",
                          "tf": 3.8461538461538463
                        },
                        "Output.html#sendControlChange": {
                          "ref": "Output.html#sendControlChange",
                          "tf": 18.111753371868975
                        },
                        "Output.html#setRegisteredParameter": {
                          "ref": "Output.html#setRegisteredParameter",
                          "tf": 0.6369426751592357
                        },
                        "OutputChannel.html#sendControlChange": {
                          "ref": "OutputChannel.html#sendControlChange",
                          "tf": 21.44508670520231
                        },
                        "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                          "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                          "tf": 0.4032258064516129
                        },
                        "WebMidi.html#MIDI_NRPN_MESSAGES": {
                          "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                          "tf": 2
                        },
                        "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                          "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                          "tf": 0.78125
                        }
                      },
                      "c": {
                        "docs": {},
                        "h": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "g": {
                                "docs": {
                                  "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                                    "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                                    "tf": 1.4285714285714286
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "a": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "Output.html#channels": {
                          "ref": "Output.html#channels",
                          "tf": 5.555555555555555
                        },
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.5714285714285714
                        },
                        "WebMidi.html#getInputByName": {
                          "ref": "WebMidi.html#getInputByName",
                          "tf": 2
                        },
                        "WebMidi.html#getOutputByName": {
                          "ref": "WebMidi.html#getOutputByName",
                          "tf": 2
                        },
                        "WebMidi.html#guessNoteNumber": {
                          "ref": "WebMidi.html#guessNoteNumber",
                          "tf": 1.25
                        }
                      }
                    }
                  }
                },
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "u": {
                      "docs": {
                        "Output.html#sendContinue": {
                          "ref": "Output.html#sendContinue",
                          "tf": 2.380952380952381
                        },
                        "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                          "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                          "tf": 0.5617977528089888
                        }
                      }
                    }
                  }
                }
              },
              "s": {
                "docs": {},
                "u": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Output.html#sendControlChange": {
                          "ref": "Output.html#sendControlChange",
                          "tf": 0.2890173410404624
                        },
                        "OutputChannel.html#sendControlChange": {
                          "ref": "OutputChannel.html#sendControlChange",
                          "tf": 0.2890173410404624
                        }
                      }
                    }
                  }
                },
                "o": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      ".": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "g": {
                              "docs": {},
                              "(": {
                                "docs": {},
                                "\"": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "y": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "m": {
                                              "docs": {
                                                "Output.html#sendSysex": {
                                                  "ref": "Output.html#sendSysex",
                                                  "tf": 0.33333333333333337
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "i": {
                                    "docs": {},
                                    "n": {
                                      "docs": {},
                                      "p": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "t": {
                                            "docs": {
                                              "WebMidi.html#enable": {
                                                "ref": "WebMidi.html#enable",
                                                "tf": 0.2857142857142857
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "o": {
                                    "docs": {},
                                    "u": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "p": {
                                          "docs": {},
                                          "u": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "WebMidi.html#enable": {
                                                  "ref": "WebMidi.html#enable",
                                                  "tf": 0.2857142857142857
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "w": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "b": {
                                        "docs": {},
                                        "m": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "d": {
                                              "docs": {},
                                              "i": {
                                                "docs": {},
                                                ".": {
                                                  "docs": {},
                                                  "j": {
                                                    "docs": {
                                                      "WebMidi.html#enable": {
                                                        "ref": "WebMidi.html#enable",
                                                        "tf": 0.8571428571428572
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "t": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "WebMidi.html#time": {
                                "ref": "WebMidi.html#time",
                                "tf": 1.5625
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "i": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "WebMidi.html#getNoteNumberByName": {
                        "ref": "WebMidi.html#getNoteNumberByName",
                        "tf": 0.5681818181818182
                      }
                    }
                  }
                }
              },
              "v": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "WebMidi.html#getNoteNumberByName": {
                          "ref": "WebMidi.html#getNoteNumberByName",
                          "tf": 0.5681818181818182
                        }
                      },
                      "t": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "m": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "m": {
                                          "docs": {},
                                          "p": {
                                            "docs": {
                                              "WebMidi.html#convertToTimestamp": {
                                                "ref": "WebMidi.html#convertToTimestamp",
                                                "tf": 700
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "n": {
                    "docs": {},
                    "i": {
                      "docs": {
                        "WebMidi.html#guessNoteNumber": {
                          "ref": "WebMidi.html#guessNoteNumber",
                          "tf": 1.25
                        }
                      }
                    }
                  }
                }
              },
              "f": {
                "docs": {},
                "i": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "m": {
                      "docs": {
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.2857142857142857
                        }
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "p": {
                "docs": {},
                "l": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Input.html#id": {
                          "ref": "Input.html#id",
                          "tf": 2.1739130434782608
                        },
                        "Output.html#id": {
                          "ref": "Output.html#id",
                          "tf": 2.1739130434782608
                        },
                        "WebMidi.html#disable": {
                          "ref": "WebMidi.html#disable",
                          "tf": 2.272727272727273
                        }
                      }
                    }
                  }
                },
                "o": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "Input.html#nrpnEventsEnabled": {
                        "ref": "Input.html#nrpnEventsEnabled",
                        "tf": 1.0869565217391304
                      }
                    }
                  }
                }
              },
              "m": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "Output.html#sendControlChange": {
                        "ref": "Output.html#sendControlChange",
                        "tf": 0.5780346820809248
                      },
                      "OutputChannel.html#sendControlChange": {
                        "ref": "OutputChannel.html#sendControlChange",
                        "tf": 0.5780346820809248
                      },
                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                        "tf": 0.5617977528089888
                      }
                    },
                    "j": {
                      "docs": {
                        "WebMidi.html": {
                          "ref": "WebMidi.html",
                          "tf": 0.8620689655172413
                        }
                      }
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "l": {
                "docs": {},
                "e": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "r": {
                          "docs": {
                            "Input.html#nrpnEventsEnabled": {
                              "ref": "Input.html#nrpnEventsEnabled",
                              "tf": 1.0869565217391304
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "d": {
              "docs": {},
              "e": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 1.3333333333333335
                  },
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.2857142857142857
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "r": {
                "docs": {},
                "s": {
                  "docs": {
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.3184713375796179
                    }
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "r": {
              "docs": {},
              "o": {
                "docs": {},
                "m": {
                  "docs": {},
                  "e": {
                    "docs": {
                      "Input.html#id": {
                        "ref": "Input.html#id",
                        "tf": 2.1739130434782608
                      },
                      "Output.html#id": {
                        "ref": "Output.html#id",
                        "tf": 2.1739130434782608
                      },
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.2857142857142857
                      },
                      "WebMidi.html#getInputById": {
                        "ref": "WebMidi.html#getInputById",
                        "tf": 1.4705882352941175
                      },
                      "WebMidi.html#getInputByName": {
                        "ref": "WebMidi.html#getInputByName",
                        "tf": 2
                      },
                      "WebMidi.html#getOutputById": {
                        "ref": "WebMidi.html#getOutputById",
                        "tf": 1.4705882352941175
                      },
                      "WebMidi.html#getOutputByName": {
                        "ref": "WebMidi.html#getOutputByName",
                        "tf": 2
                      }
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "n": {
                "docs": {},
                "g": {
                  "docs": {
                    "Input.html#nrpnEventsEnabled": {
                      "ref": "Input.html#nrpnEventsEnabled",
                      "tf": 4.3478260869565215
                    },
                    "Input.html#getCcNameByNumber": {
                      "ref": "Input.html#getCcNameByNumber",
                      "tf": 3.8461538461538463
                    },
                    "Output.html#sendControlChange": {
                      "ref": "Output.html#sendControlChange",
                      "tf": 1.4450867052023122
                    },
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.3184713375796179
                    },
                    "OutputChannel.html#sendControlChange": {
                      "ref": "OutputChannel.html#sendControlChange",
                      "tf": 1.4450867052023122
                    },
                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                      "tf": 0.4032258064516129
                    },
                    "WebMidi.html#MIDI_NRPN_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                      "tf": 2
                    },
                    "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                      "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                      "tf": 0.78125
                    },
                    "WebMidi.html#getInputById": {
                      "ref": "WebMidi.html#getInputById",
                      "tf": 1.4705882352941175
                    },
                    "WebMidi.html#getInputByName": {
                      "ref": "WebMidi.html#getInputByName",
                      "tf": 2
                    },
                    "WebMidi.html#getOutputById": {
                      "ref": "WebMidi.html#getOutputById",
                      "tf": 1.4705882352941175
                    },
                    "WebMidi.html#getOutputByName": {
                      "ref": "WebMidi.html#getOutputByName",
                      "tf": 2
                    }
                  }
                },
                "n": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "Input.html#getChannelModeByNumber": {
                          "ref": "Input.html#getChannelModeByNumber",
                          "tf": 4.166666666666666
                        },
                        "InputChannel.html#number": {
                          "ref": "InputChannel.html#number",
                          "tf": 12.5
                        },
                        "InputChannel.html#output": {
                          "ref": "InputChannel.html#output",
                          "tf": 16.666666666666664
                        },
                        "Output.html#channels": {
                          "ref": "Output.html#channels",
                          "tf": 700
                        },
                        "Output.html#sendChannelAftertouch": {
                          "ref": "Output.html#sendChannelAftertouch",
                          "tf": 23.846153846153847
                        },
                        "Output.html#sendControlChange": {
                          "ref": "Output.html#sendControlChange",
                          "tf": 16.666666666666664
                        },
                        "Output.html#sendKeyAftertouch": {
                          "ref": "Output.html#sendKeyAftertouch",
                          "tf": 19.444444444444443
                        },
                        "Output.html#setPitchBendRange": {
                          "ref": "Output.html#setPitchBendRange",
                          "tf": 16.666666666666664
                        },
                        "Output.html#setRegisteredParameter": {
                          "ref": "Output.html#setRegisteredParameter",
                          "tf": 17.3036093418259
                        },
                        "OutputChannel.html#number": {
                          "ref": "OutputChannel.html#number",
                          "tf": 12.5
                        },
                        "OutputChannel.html#output": {
                          "ref": "OutputChannel.html#output",
                          "tf": 16.666666666666664
                        },
                        "OutputChannel.html#sendControlChange": {
                          "ref": "OutputChannel.html#sendControlChange",
                          "tf": 0.2890173410404624
                        },
                        "OutputChannel.html#sendKeyAftertouch": {
                          "ref": "OutputChannel.html#sendKeyAftertouch",
                          "tf": 3.125
                        },
                        "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                          "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                          "tf": 3.571428571428571
                        },
                        "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                          "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                          "tf": 2.1739130434782608
                        },
                        "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                          "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                          "tf": 1.4285714285714286
                        },
                        "WebMidi.html#sanitizeChannels": {
                          "ref": "WebMidi.html#sanitizeChannels",
                          "tf": 36.39455782312925
                        }
                      },
                      "(": {
                        "docs": {
                          "Output.html#sendChannelAftertouch": {
                            "ref": "Output.html#sendChannelAftertouch",
                            "tf": 3.8461538461538463
                          },
                          "Output.html#sendControlChange": {
                            "ref": "Output.html#sendControlChange",
                            "tf": 0.2890173410404624
                          },
                          "Output.html#sendKeyAftertouch": {
                            "ref": "Output.html#sendKeyAftertouch",
                            "tf": 2.7777777777777777
                          },
                          "Output.html#setPitchBendRange": {
                            "ref": "Output.html#setPitchBendRange",
                            "tf": 1.7857142857142856
                          }
                        }
                      },
                      "c": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "s": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "u": {
                                      "docs": {},
                                      "n": {
                                        "docs": {
                                          "Output.html#setRegisteredParameter": {
                                            "ref": "Output.html#setRegisteredParameter",
                                            "tf": 0.3184713375796179
                                          },
                                          "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                            "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                            "tf": 0.78125
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "f": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "t": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "n": {
                                    "docs": {
                                      "Output.html#setRegisteredParameter": {
                                        "ref": "Output.html#setRegisteredParameter",
                                        "tf": 0.3184713375796179
                                      },
                                      "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                        "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                        "tf": 0.78125
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "a": {
                        "docs": {},
                        "f": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "u": {
                                      "docs": {},
                                      "c": {
                                        "docs": {},
                                        "h": {
                                          "docs": {
                                            "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                                              "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                                              "tf": 1.4285714285714286
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "m": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "d": {
                            "docs": {
                              "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                                "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                                "tf": 1.4285714285714286
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "r": {
                "docs": {},
                "u": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "v": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "l": {
                              "docs": {
                                "Output.html#sendControlChange": {
                                  "ref": "Output.html#sendControlChange",
                                  "tf": 0.2890173410404624
                                },
                                "OutputChannel.html#sendControlChange": {
                                  "ref": "OutputChannel.html#sendControlChange",
                                  "tf": 0.2890173410404624
                                },
                                "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                  "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                  "tf": 0.4032258064516129
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "c": {
                "docs": {},
                "k": {
                  "docs": {
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.5714285714285714
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {
              "Output.html#sendContinue": {
                "ref": "Output.html#sendContinue",
                "tf": 2.380952380952381
              }
            },
            "r": {
              "docs": {},
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Output.html#sendStart": {
                          "ref": "Output.html#sendStart",
                          "tf": 2.380952380952381
                        },
                        "WebMidi.html#inputs": {
                          "ref": "WebMidi.html#inputs",
                          "tf": 10
                        },
                        "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                          "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                          "tf": 0.78125
                        },
                        "WebMidi.html#outputs": {
                          "ref": "WebMidi.html#outputs",
                          "tf": 10
                        },
                        "WebMidi.html#convertToTimestamp": {
                          "ref": "WebMidi.html#convertToTimestamp",
                          "tf": 1.3888888888888888
                        },
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.2857142857142857
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "o": {
                  "docs": {},
                  "m": {
                    "docs": {
                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                        "tf": 1.1235955056179776
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "l": {
              "docs": {},
              "e": {
                "docs": {},
                "s": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "v": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "l": {
                                "docs": {
                                  "Output.html#sendControlChange": {
                                    "ref": "Output.html#sendControlChange",
                                    "tf": 0.2890173410404624
                                  },
                                  "OutputChannel.html#sendControlChange": {
                                    "ref": "OutputChannel.html#sendControlChange",
                                    "tf": 0.2890173410404624
                                  },
                                  "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                    "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                    "tf": 0.4032258064516129
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "t": {
                "docs": {
                  "Output.html#setPitchBendRange": {
                    "ref": "Output.html#setPitchBendRange",
                    "tf": 18.45238095238095
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "l": {
              "docs": {},
              "l": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  },
                  "WebMidi.html": {
                    "ref": "WebMidi.html",
                    "tf": 0.8620689655172413
                  }
                },
                "b": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "k": {
                        "docs": {
                          "WebMidi.html#enable": {
                            "ref": "WebMidi.html#enable",
                            "tf": 0.8571428571428572
                          }
                        }
                      }
                    }
                  }
                }
              },
              "c": {
                "docs": {},
                "u": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "WebMidi.html#convertToTimestamp": {
                        "ref": "WebMidi.html#convertToTimestamp",
                        "tf": 1.3888888888888888
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "e": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  }
                }
              }
            },
            "u": {
              "docs": {},
              "s": {
                "docs": {
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.2857142857142857
                  }
                }
              }
            }
          },
          "j": {
            "docs": {
              "WebMidi.html": {
                "ref": "WebMidi.html",
                "tf": 0.8620689655172413
              }
            }
          },
          "r": {
            "docs": {},
            "e": {
              "docs": {},
              "a": {
                "docs": {},
                "t": {
                  "docs": {
                    "WebMidi.html#MIDI_NRPN_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                      "tf": 2
                    }
                  }
                }
              }
            }
          }
        },
        "e": {
          "docs": {
            "WebMidi.html#enable": {
              "ref": "WebMidi.html#enable",
              "tf": 0.5714285714285714
            }
          },
          "x": {
            "docs": {},
            "p": {
              "docs": {},
              "o": {
                "docs": {},
                "r": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Input.html": {
                        "ref": "Input.html",
                        "tf": 2.083333333333333
                      },
                      "Output.html": {
                        "ref": "Output.html",
                        "tf": 2.083333333333333
                      }
                    }
                  }
                }
              },
              "e": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Input.html#id": {
                        "ref": "Input.html#id",
                        "tf": 2.1739130434782608
                      },
                      "Output.html#id": {
                        "ref": "Output.html#id",
                        "tf": 2.1739130434782608
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "s": {
                      "docs": {
                        "Output.html#sendSongPosition": {
                          "ref": "Output.html#sendSongPosition",
                          "tf": 2.631578947368421
                        }
                      },
                      "i": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "c": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "a": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "s": {
                                      "docs": {
                                        "Output.html#sendControlChange": {
                                          "ref": "Output.html#sendControlChange",
                                          "tf": 0.2890173410404624
                                        },
                                        "OutputChannel.html#sendControlChange": {
                                          "ref": "OutputChannel.html#sendControlChange",
                                          "tf": 0.2890173410404624
                                        },
                                        "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                          "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                          "tf": 0.4032258064516129
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "f": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "n": {
                                  "docs": {
                                    "Output.html#sendControlChange": {
                                      "ref": "Output.html#sendControlChange",
                                      "tf": 0.2890173410404624
                                    },
                                    "OutputChannel.html#sendControlChange": {
                                      "ref": "OutputChannel.html#sendControlChange",
                                      "tf": 0.2890173410404624
                                    },
                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                      "tf": 0.4032258064516129
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "m": {
                "docs": {},
                "p": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "Input.html#id": {
                        "ref": "Input.html#id",
                        "tf": 2.1739130434782608
                      },
                      "Output.html#id": {
                        "ref": "Output.html#id",
                        "tf": 2.1739130434782608
                      },
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 0.6666666666666667
                      },
                      "WebMidi.html#octaveOffset": {
                        "ref": "WebMidi.html#octaveOffset",
                        "tf": 1.3513513513513513
                      },
                      "WebMidi.html#supported": {
                        "ref": "WebMidi.html#supported",
                        "tf": 1.7241379310344827
                      },
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.2857142857142857
                      },
                      "WebMidi.html#getInputById": {
                        "ref": "WebMidi.html#getInputById",
                        "tf": 1.4705882352941175
                      },
                      "WebMidi.html#getInputByName": {
                        "ref": "WebMidi.html#getInputByName",
                        "tf": 2
                      },
                      "WebMidi.html#getNoteNumberByName": {
                        "ref": "WebMidi.html#getNoteNumberByName",
                        "tf": 1.1363636363636365
                      },
                      "WebMidi.html#getOutputById": {
                        "ref": "WebMidi.html#getOutputById",
                        "tf": 1.4705882352941175
                      },
                      "WebMidi.html#getOutputByName": {
                        "ref": "WebMidi.html#getOutputByName",
                        "tf": 2
                      }
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "l": {
                "docs": {},
                "u": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 1.3333333333333335
                      },
                      "WebMidi.html#sysexEnabled": {
                        "ref": "WebMidi.html#sysexEnabled",
                        "tf": 4.166666666666666
                      },
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.5714285714285714
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "e": {
                "docs": {},
                "n": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "Output.html#setRegisteredParameter": {
                        "ref": "Output.html#setRegisteredParameter",
                        "tf": 0.3184713375796179
                      },
                      "WebMidi.html": {
                        "ref": "WebMidi.html",
                        "tf": 0.8620689655172413
                      },
                      "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                        "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                        "tf": 0.78125
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "a": {
                  "docs": {
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.3184713375796179
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "c": {
                "docs": {},
                "u": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.5714285714285714
                      }
                    }
                  }
                }
              }
            }
          },
          "v": {
            "docs": {},
            "e": {
              "docs": {},
              "n": {
                "docs": {
                  "WebMidi.html#supported": {
                    "ref": "WebMidi.html#supported",
                    "tf": 1.7241379310344827
                  }
                },
                "t": {
                  "docs": {
                    "Input.html#nrpnEventsEnabled": {
                      "ref": "Input.html#nrpnEventsEnabled",
                      "tf": 2.1739130434782608
                    },
                    "WebMidi.html#MIDI_INTERFACE_EVENTS": {
                      "ref": "WebMidi.html#MIDI_INTERFACE_EVENTS",
                      "tf": 8.333333333333332
                    },
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 1.1428571428571428
                    }
                  },
                  "e": {
                    "docs": {},
                    "m": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "WebMidi.html": {
                                "ref": "WebMidi.html",
                                "tf": 0.8620689655172413
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            "c": {
              "docs": {
                "Output.html#send": {
                  "ref": "Output.html#send",
                  "tf": 1.282051282051282
                },
                "Output.html#sendSysex": {
                  "ref": "Output.html#sendSysex",
                  "tf": 0.33333333333333337
                },
                "Output.html#setRegisteredParameter": {
                  "ref": "Output.html#setRegisteredParameter",
                  "tf": 0.3184713375796179
                },
                "OutputChannel.html#send": {
                  "ref": "OutputChannel.html#send",
                  "tf": 1.4285714285714286
                },
                "WebMidi.html#getNoteNumberByName": {
                  "ref": "WebMidi.html#getNoteNumberByName",
                  "tf": 0.5681818181818182
                },
                "WebMidi.html#guessNoteNumber": {
                  "ref": "WebMidi.html#guessNoteNumber",
                  "tf": 1.25
                }
              }
            }
          },
          "f": {
            "docs": {},
            "f": {
              "docs": {},
              "e": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "l": {
                                  "1": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "s": {
                                              "docs": {
                                                "Output.html#sendControlChange": {
                                                  "ref": "Output.html#sendControlChange",
                                                  "tf": 0.2890173410404624
                                                },
                                                "OutputChannel.html#sendControlChange": {
                                                  "ref": "OutputChannel.html#sendControlChange",
                                                  "tf": 0.2890173410404624
                                                },
                                                "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                  "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                  "tf": 0.4032258064516129
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "f": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "n": {
                                          "docs": {
                                            "Output.html#sendControlChange": {
                                              "ref": "Output.html#sendControlChange",
                                              "tf": 0.2890173410404624
                                            },
                                            "OutputChannel.html#sendControlChange": {
                                              "ref": "OutputChannel.html#sendControlChange",
                                              "tf": 0.2890173410404624
                                            },
                                            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                              "tf": 0.4032258064516129
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "2": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "s": {
                                              "docs": {
                                                "Output.html#sendControlChange": {
                                                  "ref": "Output.html#sendControlChange",
                                                  "tf": 0.2890173410404624
                                                },
                                                "OutputChannel.html#sendControlChange": {
                                                  "ref": "OutputChannel.html#sendControlChange",
                                                  "tf": 0.2890173410404624
                                                },
                                                "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                  "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                  "tf": 0.4032258064516129
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "f": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "n": {
                                          "docs": {
                                            "Output.html#sendControlChange": {
                                              "ref": "Output.html#sendControlChange",
                                              "tf": 0.2890173410404624
                                            },
                                            "OutputChannel.html#sendControlChange": {
                                              "ref": "OutputChannel.html#sendControlChange",
                                              "tf": 0.2890173410404624
                                            },
                                            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                              "tf": 0.4032258064516129
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "docs": {}
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "s": {
              "docs": {},
              "e": {
                "docs": {},
                "w": {
                  "docs": {},
                  "h": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "r": {
                        "docs": {
                          "Output.html#sendStart": {
                            "ref": "Output.html#sendStart",
                            "tf": 2.380952380952381
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "v": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  }
                },
                "a": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "g": {
                                "docs": {},
                                "l": {
                                  "docs": {
                                    "Output.html#setRegisteredParameter": {
                                      "ref": "Output.html#setRegisteredParameter",
                                      "tf": 0.3184713375796179
                                    },
                                    "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                      "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                      "tf": 0.78125
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "p": {
                "docs": {},
                "s": {
                  "docs": {
                    "WebMidi.html#time": {
                      "ref": "WebMidi.html#time",
                      "tf": 1.5625
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "a": {
              "docs": {},
              "b": {
                "docs": {},
                "l": {
                  "docs": {
                    "Output.html#sendSysex": {
                      "ref": "Output.html#sendSysex",
                      "tf": 1
                    },
                    "WebMidi.html#enabled": {
                      "ref": "WebMidi.html#enabled",
                      "tf": 683.3333333333334
                    },
                    "WebMidi.html#sysexEnabled": {
                      "ref": "WebMidi.html#sysexEnabled",
                      "tf": 8.333333333333332
                    },
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 679
                    }
                  }
                }
              }
            },
            "d": {
              "docs": {
                "Output.html#sendSysex": {
                  "ref": "Output.html#sendSysex",
                  "tf": 0.33333333333333337
                },
                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                  "tf": 0.5617977528089888
                },
                "WebMidi.html#enable": {
                  "ref": "WebMidi.html#enable",
                  "tf": 0.2857142857142857
                }
              }
            },
            "u": {
              "docs": {},
              "m": {
                "docs": {
                  "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                    "tf": 3.571428571428571
                  },
                  "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                    "tf": 2.1739130434782608
                  },
                  "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                    "tf": 1.4285714285714286
                  },
                  "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                    "tf": 0.4032258064516129
                  },
                  "WebMidi.html#MIDI_NRPN_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                    "tf": 2
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 0.78125
                  },
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "r": {
                "docs": {},
                "y": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "b": {
                        "docs": {
                          "WebMidi.html#MIDI_NRPN_MESSAGES": {
                            "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                            "tf": 2
                          }
                        }
                      }
                    }
                  },
                  "m": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "b": {
                        "docs": {
                          "WebMidi.html#MIDI_NRPN_MESSAGES": {
                            "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                            "tf": 2
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "v": {
              "docs": {},
              "i": {
                "docs": {},
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "WebMidi.html#supported": {
                          "ref": "WebMidi.html#supported",
                          "tf": 3.4482758620689653
                        },
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.5714285714285714
                        },
                        "WebMidi.html#getInputByName": {
                          "ref": "WebMidi.html#getInputByName",
                          "tf": 2
                        },
                        "WebMidi.html#getOutputByName": {
                          "ref": "WebMidi.html#getOutputByName",
                          "tf": 2
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "q": {
            "docs": {},
            "u": {
              "docs": {},
              "i": {
                "docs": {},
                "v": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "Output.html#sendSysex": {
                          "ref": "Output.html#sendSysex",
                          "tf": 0.33333333333333337
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "c": {
              "docs": {},
              "h": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "i": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "WebMidi.html": {
                        "ref": "WebMidi.html",
                        "tf": 0.8620689655172413
                      }
                    }
                  }
                }
              }
            }
          },
          "s": {
            "6": {
              "docs": {
                "WebMidi.html": {
                  "ref": "WebMidi.html",
                  "tf": 0.8620689655172413
                }
              }
            },
            "docs": {},
            "m": {
              "docs": {
                "WebMidi.html": {
                  "ref": "WebMidi.html",
                  "tf": 0.8620689655172413
                }
              }
            }
          },
          ".": {
            "docs": {},
            "g": {
              "docs": {
                "WebMidi.html#enable": {
                  "ref": "WebMidi.html#enable",
                  "tf": 0.2857142857142857
                }
              }
            }
          },
          "b": {
            "docs": {
              "WebMidi.html#getNoteNumberByName": {
                "ref": "WebMidi.html#getNoteNumberByName",
                "tf": 0.5681818181818182
              }
            }
          },
          "r": {
            "docs": {},
            "r": {
              "docs": {},
              "o": {
                "docs": {},
                "r": {
                  "docs": {
                    "WebMidi.html#getNoteNumberByName": {
                      "ref": "WebMidi.html#getNoteNumberByName",
                      "tf": 0.5681818181818182
                    },
                    "WebMidi.html#guessNoteNumber": {
                      "ref": "WebMidi.html#guessNoteNumber",
                      "tf": 1.25
                    }
                  }
                }
              }
            }
          },
          "m": {
            "docs": {},
            "p": {
              "docs": {},
              "t": {
                "docs": {},
                "i": {
                  "docs": {
                    "WebMidi.html#sanitizeChannels": {
                      "ref": "WebMidi.html#sanitizeChannels",
                      "tf": 1.0204081632653061
                    }
                  }
                }
              }
            }
          }
        },
        "f": {
          "0": {
            "docs": {
              "WebMidi.html#getNoteNumberByName": {
                "ref": "WebMidi.html#getNoteNumberByName",
                "tf": 0.5681818181818182
              }
            }
          },
          "docs": {},
          "i": {
            "docs": {},
            "n": {
              "docs": {},
              "d": {
                "docs": {
                  "Input.html": {
                    "ref": "Input.html",
                    "tf": 2.083333333333333
                  },
                  "Output.html": {
                    "ref": "Output.html",
                    "tf": 2.083333333333333
                  }
                }
              },
              "e": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "e": {
                "docs": {
                  "Input.html#nrpnEventsEnabled": {
                    "ref": "Input.html#nrpnEventsEnabled",
                    "tf": 1.0869565217391304
                  }
                }
              },
              "s": {
                "docs": {},
                "t": {
                  "docs": {
                    "Output.html#sendSysex": {
                      "ref": "Output.html#sendSysex",
                      "tf": 0.6666666666666667
                    },
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.3184713375796179
                    },
                    "WebMidi.html#getInputByName": {
                      "ref": "WebMidi.html#getInputByName",
                      "tf": 2
                    },
                    "WebMidi.html#getOutputByName": {
                      "ref": "WebMidi.html#getOutputByName",
                      "tf": 2
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "e": {
                "docs": {
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.2857142857142857
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "l": {
              "docs": {},
              "l": {
                "docs": {
                  "Input.html#nrpnEventsEnabled": {
                    "ref": "Input.html#nrpnEventsEnabled",
                    "tf": 1.0869565217391304
                  }
                }
              },
              "s": {
                "docs": {
                  "Input.html#getCcNameByNumber": {
                    "ref": "Input.html#getCcNameByNumber",
                    "tf": 3.8461538461538463
                  },
                  "Input.html#getChannelModeByNumber": {
                    "ref": "Input.html#getChannelModeByNumber",
                    "tf": 4.166666666666666
                  },
                  "WebMidi.html#convertToTimestamp": {
                    "ref": "WebMidi.html#convertToTimestamp",
                    "tf": 1.3888888888888888
                  },
                  "WebMidi.html#getInputById": {
                    "ref": "WebMidi.html#getInputById",
                    "tf": 1.4705882352941175
                  },
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 0.5681818181818182
                  },
                  "WebMidi.html#getOctave": {
                    "ref": "WebMidi.html#getOctave",
                    "tf": 1.282051282051282
                  },
                  "WebMidi.html#getOutputById": {
                    "ref": "WebMidi.html#getOutputById",
                    "tf": 1.4705882352941175
                  },
                  "WebMidi.html#guessNoteNumber": {
                    "ref": "WebMidi.html#guessNoteNumber",
                    "tf": 1.25
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "i": {
                "docs": {},
                "l": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "r": {
                        "docs": {
                          "Output.html#send": {
                            "ref": "Output.html#send",
                            "tf": 1.282051282051282
                          },
                          "Output.html#setRegisteredParameter": {
                            "ref": "Output.html#setRegisteredParameter",
                            "tf": 0.3184713375796179
                          },
                          "OutputChannel.html#send": {
                            "ref": "OutputChannel.html#send",
                            "tf": 1.4285714285714286
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "v": {
              "docs": {},
              "o": {
                "docs": {},
                "u": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "Output.html#setRegisteredParameter": {
                        "ref": "Output.html#setRegisteredParameter",
                        "tf": 0.3184713375796179
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "n": {
              "docs": {},
              "c": {
                "docs": {},
                "t": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "n": {
                        "docs": {
                          "Input.html#destroy": {
                            "ref": "Input.html#destroy",
                            "tf": 110
                          },
                          "Input.html#getCcNameByNumber": {
                            "ref": "Input.html#getCcNameByNumber",
                            "tf": 113.84615384615384
                          },
                          "Input.html#getChannelModeByNumber": {
                            "ref": "Input.html#getChannelModeByNumber",
                            "tf": 114.16666666666667
                          },
                          "Input.html#open": {
                            "ref": "Input.html#open",
                            "tf": 110
                          },
                          "Output.html#clear": {
                            "ref": "Output.html#clear",
                            "tf": 110
                          },
                          "Output.html#close": {
                            "ref": "Output.html#close",
                            "tf": 110
                          },
                          "Output.html#destroy": {
                            "ref": "Output.html#destroy",
                            "tf": 110
                          },
                          "Output.html#open": {
                            "ref": "Output.html#open",
                            "tf": 110
                          },
                          "Output.html#send": {
                            "ref": "Output.html#send",
                            "tf": 110
                          },
                          "Output.html#sendActiveSensing": {
                            "ref": "Output.html#sendActiveSensing",
                            "tf": 110
                          },
                          "Output.html#sendChannelAftertouch": {
                            "ref": "Output.html#sendChannelAftertouch",
                            "tf": 110
                          },
                          "Output.html#sendClock": {
                            "ref": "Output.html#sendClock",
                            "tf": 110
                          },
                          "Output.html#sendContinue": {
                            "ref": "Output.html#sendContinue",
                            "tf": 110
                          },
                          "Output.html#sendControlChange": {
                            "ref": "Output.html#sendControlChange",
                            "tf": 110
                          },
                          "Output.html#sendKeyAftertouch": {
                            "ref": "Output.html#sendKeyAftertouch",
                            "tf": 110
                          },
                          "Output.html#sendReset": {
                            "ref": "Output.html#sendReset",
                            "tf": 110
                          },
                          "Output.html#sendSongPosition": {
                            "ref": "Output.html#sendSongPosition",
                            "tf": 110
                          },
                          "Output.html#sendSongSelect": {
                            "ref": "Output.html#sendSongSelect",
                            "tf": 110
                          },
                          "Output.html#sendStart": {
                            "ref": "Output.html#sendStart",
                            "tf": 110
                          },
                          "Output.html#sendStop": {
                            "ref": "Output.html#sendStop",
                            "tf": 110
                          },
                          "Output.html#sendSysex": {
                            "ref": "Output.html#sendSysex",
                            "tf": 110
                          },
                          "Output.html#sendTimecodeQuarterFrame": {
                            "ref": "Output.html#sendTimecodeQuarterFrame",
                            "tf": 110
                          },
                          "Output.html#sendTuneRequest": {
                            "ref": "Output.html#sendTuneRequest",
                            "tf": 110
                          },
                          "Output.html#setPitchBendRange": {
                            "ref": "Output.html#setPitchBendRange",
                            "tf": 110
                          },
                          "Output.html#setRegisteredParameter": {
                            "ref": "Output.html#setRegisteredParameter",
                            "tf": 110.63694267515923
                          },
                          "OutputChannel.html#send": {
                            "ref": "OutputChannel.html#send",
                            "tf": 110
                          },
                          "OutputChannel.html#sendControlChange": {
                            "ref": "OutputChannel.html#sendControlChange",
                            "tf": 110
                          },
                          "OutputChannel.html#sendKeyAftertouch": {
                            "ref": "OutputChannel.html#sendKeyAftertouch",
                            "tf": 110
                          },
                          "WebMidi.html#supported": {
                            "ref": "WebMidi.html#supported",
                            "tf": 1.7241379310344827
                          },
                          "WebMidi.html#convertToTimestamp": {
                            "ref": "WebMidi.html#convertToTimestamp",
                            "tf": 110
                          },
                          "WebMidi.html#disable": {
                            "ref": "WebMidi.html#disable",
                            "tf": 110
                          },
                          "WebMidi.html#enable": {
                            "ref": "WebMidi.html#enable",
                            "tf": 110.57142857142857
                          },
                          "WebMidi.html#getInputById": {
                            "ref": "WebMidi.html#getInputById",
                            "tf": 110
                          },
                          "WebMidi.html#getInputByName": {
                            "ref": "WebMidi.html#getInputByName",
                            "tf": 110
                          },
                          "WebMidi.html#getNoteNumberByName": {
                            "ref": "WebMidi.html#getNoteNumberByName",
                            "tf": 110.56818181818181
                          },
                          "WebMidi.html#getOctave": {
                            "ref": "WebMidi.html#getOctave",
                            "tf": 110
                          },
                          "WebMidi.html#getOutputById": {
                            "ref": "WebMidi.html#getOutputById",
                            "tf": 110
                          },
                          "WebMidi.html#getOutputByName": {
                            "ref": "WebMidi.html#getOutputByName",
                            "tf": 110
                          },
                          "WebMidi.html#guessNoteNumber": {
                            "ref": "WebMidi.html#guessNoteNumber",
                            "tf": 110
                          },
                          "WebMidi.html#sanitizeChannels": {
                            "ref": "WebMidi.html#sanitizeChannels",
                            "tf": 111.0204081632653
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "f": {
                "docs": {},
                "i": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.2857142857142857
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "u": {
                "docs": {},
                "r": {
                  "docs": {
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.2857142857142857
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "u": {
              "docs": {},
              "n": {
                "docs": {},
                "d": {
                  "docs": {
                    "Input.html#getCcNameByNumber": {
                      "ref": "Input.html#getCcNameByNumber",
                      "tf": 3.8461538461538463
                    },
                    "Input.html#getChannelModeByNumber": {
                      "ref": "Input.html#getChannelModeByNumber",
                      "tf": 4.166666666666666
                    },
                    "WebMidi.html#getInputById": {
                      "ref": "WebMidi.html#getInputById",
                      "tf": 1.4705882352941175
                    },
                    "WebMidi.html#getOutputById": {
                      "ref": "WebMidi.html#getOutputById",
                      "tf": 1.4705882352941175
                    }
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "m": {
                "docs": {
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 0.5681818181818182
                  }
                },
                "a": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Output.html#send": {
                        "ref": "Output.html#send",
                        "tf": 2.564102564102564
                      },
                      "Output.html#sendTimecodeQuarterFrame": {
                        "ref": "Output.html#sendTimecodeQuarterFrame",
                        "tf": 5
                      },
                      "OutputChannel.html#send": {
                        "ref": "OutputChannel.html#send",
                        "tf": 2.857142857142857
                      }
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "l": {
                "docs": {},
                "o": {
                  "docs": {},
                  "w": {
                    "docs": {
                      "Output.html#sendControlChange": {
                        "ref": "Output.html#sendControlChange",
                        "tf": 0.2890173410404624
                      },
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 0.33333333333333337
                      },
                      "OutputChannel.html#sendControlChange": {
                        "ref": "OutputChannel.html#sendControlChange",
                        "tf": 0.2890173410404624
                      },
                      "WebMidi.html#convertToTimestamp": {
                        "ref": "WebMidi.html#convertToTimestamp",
                        "tf": 1.3888888888888888
                      },
                      "WebMidi.html#sanitizeChannels": {
                        "ref": "WebMidi.html#sanitizeChannels",
                        "tf": 1.0204081632653061
                      }
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "t": {
                "docs": {},
                "c": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "l": {
                              "docs": {},
                              "l": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "s": {
                                              "docs": {
                                                "Output.html#sendControlChange": {
                                                  "ref": "Output.html#sendControlChange",
                                                  "tf": 0.2890173410404624
                                                },
                                                "OutputChannel.html#sendControlChange": {
                                                  "ref": "OutputChannel.html#sendControlChange",
                                                  "tf": 0.2890173410404624
                                                },
                                                "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                  "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                  "tf": 0.4032258064516129
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "f": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "n": {
                                          "docs": {
                                            "Output.html#sendControlChange": {
                                              "ref": "Output.html#sendControlChange",
                                              "tf": 0.2890173410404624
                                            },
                                            "OutputChannel.html#sendControlChange": {
                                              "ref": "OutputChannel.html#sendControlChange",
                                              "tf": 0.2890173410404624
                                            },
                                            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                              "tf": 0.4032258064516129
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "i": {
              "docs": {},
              "e": {
                "docs": {},
                "n": {
                  "docs": {},
                  "d": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "Output.html#sendSongSelect": {
                            "ref": "Output.html#sendSongSelect",
                            "tf": 3.571428571428571
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "m": {
                "docs": {},
                "e": {
                  "docs": {
                    "Output.html#sendTimecodeQuarterFrame": {
                      "ref": "Output.html#sendTimecodeQuarterFrame",
                      "tf": 2.5
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "o": {
              "docs": {},
              "a": {
                "docs": {},
                "t": {
                  "docs": {
                    "WebMidi.html#time": {
                      "ref": "WebMidi.html#time",
                      "tf": 1.5625
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "t": {
                "docs": {
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 1.1363636363636365
                  }
                }
              }
            }
          },
          "#": {
            "4": {
              "docs": {
                "WebMidi.html#guessNoteNumber": {
                  "ref": "WebMidi.html#guessNoteNumber",
                  "tf": 1.25
                }
              }
            },
            "docs": {}
          }
        },
        "o": {
          "docs": {},
          "b": {
            "docs": {},
            "j": {
              "docs": {},
              "e": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Input.html": {
                        "ref": "Input.html",
                        "tf": 4.166666666666666
                      },
                      "Output.html": {
                        "ref": "Output.html",
                        "tf": 4.166666666666666
                      },
                      "Output.html#channels": {
                        "ref": "Output.html#channels",
                        "tf": 5.555555555555555
                      },
                      "WebMidi.html": {
                        "ref": "WebMidi.html",
                        "tf": 4.310344827586207
                      },
                      "WebMidi.html#disable": {
                        "ref": "WebMidi.html#disable",
                        "tf": 6.8181818181818175
                      },
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.2857142857142857
                      },
                      "WebMidi.html#getInputById": {
                        "ref": "WebMidi.html#getInputById",
                        "tf": 1.4705882352941175
                      },
                      "WebMidi.html#getInputByName": {
                        "ref": "WebMidi.html#getInputByName",
                        "tf": 2
                      },
                      "WebMidi.html#getOutputById": {
                        "ref": "WebMidi.html#getOutputById",
                        "tf": 1.4705882352941175
                      },
                      "WebMidi.html#getOutputByName": {
                        "ref": "WebMidi.html#getOutputByName",
                        "tf": 2
                      }
                    },
                    ".": {
                      "docs": {},
                      "&": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            ";": {
                              "docs": {},
                              "s": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "r": {
                                    "docs": {
                                      "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                                        "tf": 25
                                      },
                                      "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                                        "tf": 25
                                      },
                                      "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                                        "tf": 25
                                      },
                                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                        "tf": 25
                                      },
                                      "WebMidi.html#MIDI_NRPN_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                                        "tf": 25
                                      },
                                      "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                        "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                        "tf": 25
                                      },
                                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                                        "tf": 25
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "p": {
            "docs": {},
            "e": {
              "docs": {},
              "n": {
                "docs": {
                  "Input.html#connection": {
                    "ref": "Input.html#connection",
                    "tf": 7.142857142857142
                  },
                  "Input.html#open": {
                    "ref": "Input.html#open",
                    "tf": 700
                  },
                  "Output.html#connection": {
                    "ref": "Output.html#connection",
                    "tf": 7.142857142857142
                  },
                  "Output.html#open": {
                    "ref": "Output.html#open",
                    "tf": 700
                  }
                }
              },
              "r": {
                "docs": {
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.5714285714285714
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "i": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "Output.html#sendActiveSensing": {
                        "ref": "Output.html#sendActiveSensing",
                        "tf": 33.33333333333333
                      },
                      "Output.html#sendChannelAftertouch": {
                        "ref": "Output.html#sendChannelAftertouch",
                        "tf": 20
                      },
                      "Output.html#sendClock": {
                        "ref": "Output.html#sendClock",
                        "tf": 33.33333333333333
                      },
                      "Output.html#sendContinue": {
                        "ref": "Output.html#sendContinue",
                        "tf": 33.33333333333333
                      },
                      "Output.html#sendControlChange": {
                        "ref": "Output.html#sendControlChange",
                        "tf": 16.666666666666664
                      },
                      "Output.html#sendKeyAftertouch": {
                        "ref": "Output.html#sendKeyAftertouch",
                        "tf": 16.666666666666664
                      },
                      "Output.html#sendReset": {
                        "ref": "Output.html#sendReset",
                        "tf": 33.33333333333333
                      },
                      "Output.html#sendSongPosition": {
                        "ref": "Output.html#sendSongPosition",
                        "tf": 25
                      },
                      "Output.html#sendSongSelect": {
                        "ref": "Output.html#sendSongSelect",
                        "tf": 25
                      },
                      "Output.html#sendStart": {
                        "ref": "Output.html#sendStart",
                        "tf": 33.33333333333333
                      },
                      "Output.html#sendStop": {
                        "ref": "Output.html#sendStop",
                        "tf": 33.33333333333333
                      },
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 20.333333333333332
                      },
                      "Output.html#sendTimecodeQuarterFrame": {
                        "ref": "Output.html#sendTimecodeQuarterFrame",
                        "tf": 25
                      },
                      "Output.html#sendTuneRequest": {
                        "ref": "Output.html#sendTuneRequest",
                        "tf": 33.33333333333333
                      },
                      "Output.html#setPitchBendRange": {
                        "ref": "Output.html#setPitchBendRange",
                        "tf": 16.666666666666664
                      },
                      "Output.html#setRegisteredParameter": {
                        "ref": "Output.html#setRegisteredParameter",
                        "tf": 16.666666666666664
                      },
                      "OutputChannel.html#sendControlChange": {
                        "ref": "OutputChannel.html#sendControlChange",
                        "tf": 20
                      },
                      "OutputChannel.html#sendKeyAftertouch": {
                        "ref": "OutputChannel.html#sendKeyAftertouch",
                        "tf": 20
                      },
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 26.714285714285715
                      },
                      "WebMidi.html#getNoteNumberByName": {
                        "ref": "WebMidi.html#getNoteNumberByName",
                        "tf": 0.5681818181818182
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "d": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "Input.html#nrpnEventsEnabled": {
                      "ref": "Input.html#nrpnEventsEnabled",
                      "tf": 1.0869565217391304
                    },
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.2857142857142857
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "g": {
                "docs": {},
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "Output.html#setRegisteredParameter": {
                        "ref": "Output.html#setRegisteredParameter",
                        "tf": 0.6369426751592357
                      },
                      "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                        "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                        "tf": 0.78125
                      },
                      "WebMidi.html#time": {
                        "ref": "WebMidi.html#time",
                        "tf": 1.5625
                      },
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.2857142857142857
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "t": {
              "docs": {
                "Input.html#nrpnEventsEnabled": {
                  "ref": "Input.html#nrpnEventsEnabled",
                  "tf": 1.0869565217391304
                }
              },
              "p": {
                "docs": {},
                "u": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "InputChannel.html#output": {
                        "ref": "InputChannel.html#output",
                        "tf": 766.6666666666666
                      },
                      "Output.html": {
                        "ref": "Output.html",
                        "tf": 1906.25
                      },
                      "Output.html#channels": {
                        "ref": "Output.html#channels",
                        "tf": 5.555555555555555
                      },
                      "Output.html#connection": {
                        "ref": "Output.html#connection",
                        "tf": 7.142857142857142
                      },
                      "Output.html#id": {
                        "ref": "Output.html#id",
                        "tf": 2.1739130434782608
                      },
                      "Output.html#manufacturer": {
                        "ref": "Output.html#manufacturer",
                        "tf": 7.142857142857142
                      },
                      "Output.html#name": {
                        "ref": "Output.html#name",
                        "tf": 16.666666666666664
                      },
                      "Output.html#state": {
                        "ref": "Output.html#state",
                        "tf": 10
                      },
                      "Output.html#type": {
                        "ref": "Output.html#type",
                        "tf": 25
                      },
                      "Output.html#clear": {
                        "ref": "Output.html#clear",
                        "tf": 50
                      },
                      "Output.html#close": {
                        "ref": "Output.html#close",
                        "tf": 12.5
                      },
                      "Output.html#open": {
                        "ref": "Output.html#open",
                        "tf": 16.666666666666664
                      },
                      "Output.html#send": {
                        "ref": "Output.html#send",
                        "tf": 21.28205128205128
                      },
                      "Output.html#sendActiveSensing": {
                        "ref": "Output.html#sendActiveSensing",
                        "tf": 33.33333333333333
                      },
                      "Output.html#sendChannelAftertouch": {
                        "ref": "Output.html#sendChannelAftertouch",
                        "tf": 20
                      },
                      "Output.html#sendClock": {
                        "ref": "Output.html#sendClock",
                        "tf": 33.33333333333333
                      },
                      "Output.html#sendControlChange": {
                        "ref": "Output.html#sendControlChange",
                        "tf": 16.666666666666664
                      },
                      "Output.html#sendKeyAftertouch": {
                        "ref": "Output.html#sendKeyAftertouch",
                        "tf": 16.666666666666664
                      },
                      "Output.html#sendReset": {
                        "ref": "Output.html#sendReset",
                        "tf": 37.179487179487175
                      },
                      "Output.html#sendSongPosition": {
                        "ref": "Output.html#sendSongPosition",
                        "tf": 25
                      },
                      "Output.html#sendSongSelect": {
                        "ref": "Output.html#sendSongSelect",
                        "tf": 25
                      },
                      "Output.html#sendStart": {
                        "ref": "Output.html#sendStart",
                        "tf": 33.33333333333333
                      },
                      "Output.html#sendStop": {
                        "ref": "Output.html#sendStop",
                        "tf": 36.9047619047619
                      },
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 20.333333333333332
                      },
                      "Output.html#sendTimecodeQuarterFrame": {
                        "ref": "Output.html#sendTimecodeQuarterFrame",
                        "tf": 25
                      },
                      "Output.html#sendTuneRequest": {
                        "ref": "Output.html#sendTuneRequest",
                        "tf": 33.33333333333333
                      },
                      "Output.html#setPitchBendRange": {
                        "ref": "Output.html#setPitchBendRange",
                        "tf": 16.666666666666664
                      },
                      "Output.html#setRegisteredParameter": {
                        "ref": "Output.html#setRegisteredParameter",
                        "tf": 16.666666666666664
                      },
                      "OutputChannel.html#output": {
                        "ref": "OutputChannel.html#output",
                        "tf": 766.6666666666666
                      },
                      "OutputChannel.html#send": {
                        "ref": "OutputChannel.html#send",
                        "tf": 20
                      },
                      "OutputChannel.html#sendControlChange": {
                        "ref": "OutputChannel.html#sendControlChange",
                        "tf": 20
                      },
                      "WebMidi.html#outputs": {
                        "ref": "WebMidi.html#outputs",
                        "tf": 693.3333333333334
                      },
                      "WebMidi.html#disable": {
                        "ref": "WebMidi.html#disable",
                        "tf": 4.545454545454546
                      },
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.8571428571428572
                      },
                      "WebMidi.html#getOutputById": {
                        "ref": "WebMidi.html#getOutputById",
                        "tf": 2.941176470588235
                      },
                      "WebMidi.html#getOutputByName": {
                        "ref": "WebMidi.html#getOutputByName",
                        "tf": 2
                      }
                    },
                    "#": {
                      "docs": {},
                      "c": {
                        "docs": {},
                        "h": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "n": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "l": {
                                    "docs": {
                                      "Output.html#channels": {
                                        "ref": "Output.html#channels",
                                        "tf": 1150
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "o": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "c": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "Output.html#connection": {
                                        "ref": "Output.html#connection",
                                        "tf": 1150
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "l": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "r": {
                                "docs": {
                                  "Output.html#clear": {
                                    "ref": "Output.html#clear",
                                    "tf": 1150
                                  }
                                }
                              }
                            }
                          },
                          "o": {
                            "docs": {},
                            "s": {
                              "docs": {
                                "Output.html#close": {
                                  "ref": "Output.html#close",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        }
                      },
                      "i": {
                        "docs": {},
                        "d": {
                          "docs": {
                            "Output.html#id": {
                              "ref": "Output.html#id",
                              "tf": 1150
                            }
                          }
                        }
                      },
                      "m": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "u": {
                              "docs": {},
                              "f": {
                                "docs": {},
                                "a": {
                                  "docs": {},
                                  "c": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "r": {
                                          "docs": {
                                            "Output.html#manufacturer": {
                                              "ref": "Output.html#manufacturer",
                                              "tf": 1150
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "n": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "m": {
                            "docs": {
                              "Output.html#name": {
                                "ref": "Output.html#name",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      },
                      "s": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "Output.html#state": {
                              "ref": "Output.html#state",
                              "tf": 1150
                            }
                          }
                        },
                        "e": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "d": {
                              "docs": {
                                "Output.html#send": {
                                  "ref": "Output.html#send",
                                  "tf": 1150
                                }
                              },
                              "a": {
                                "docs": {},
                                "c": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "v": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "s": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "n": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {
                                                    "Output.html#sendActiveSensing": {
                                                      "ref": "Output.html#sendActiveSensing",
                                                      "tf": 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "c": {
                                "docs": {},
                                "h": {
                                  "docs": {},
                                  "a": {
                                    "docs": {},
                                    "n": {
                                      "docs": {},
                                      "n": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "l": {
                                            "docs": {},
                                            "a": {
                                              "docs": {},
                                              "f": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "r": {
                                                      "docs": {},
                                                      "t": {
                                                        "docs": {},
                                                        "o": {
                                                          "docs": {},
                                                          "u": {
                                                            "docs": {},
                                                            "c": {
                                                              "docs": {},
                                                              "h": {
                                                                "docs": {
                                                                  "Output.html#sendChannelAftertouch": {
                                                                    "ref": "Output.html#sendChannelAftertouch",
                                                                    "tf": 1150
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "l": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "k": {
                                        "docs": {
                                          "Output.html#sendClock": {
                                            "ref": "Output.html#sendClock",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "o": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "u": {
                                            "docs": {
                                              "Output.html#sendContinue": {
                                                "ref": "Output.html#sendContinue",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "r": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "l": {
                                            "docs": {},
                                            "c": {
                                              "docs": {},
                                              "h": {
                                                "docs": {},
                                                "a": {
                                                  "docs": {},
                                                  "n": {
                                                    "docs": {},
                                                    "g": {
                                                      "docs": {
                                                        "Output.html#sendControlChange": {
                                                          "ref": "Output.html#sendControlChange",
                                                          "tf": 1150
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "k": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "y": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "f": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "t": {
                                                "docs": {},
                                                "o": {
                                                  "docs": {},
                                                  "u": {
                                                    "docs": {},
                                                    "c": {
                                                      "docs": {},
                                                      "h": {
                                                        "docs": {
                                                          "Output.html#sendKeyAftertouch": {
                                                            "ref": "Output.html#sendKeyAftertouch",
                                                            "tf": 1150
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "r": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "t": {
                                        "docs": {
                                          "Output.html#sendReset": {
                                            "ref": "Output.html#sendReset",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "s": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "g": {
                                      "docs": {},
                                      "p": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "s": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "Output.html#sendSongPosition": {
                                                    "ref": "Output.html#sendSongPosition",
                                                    "tf": 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "s": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "l": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "c": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "Output.html#sendSongSelect": {
                                                      "ref": "Output.html#sendSongSelect",
                                                      "tf": 1150
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "t": {
                                  "docs": {},
                                  "a": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "t": {
                                        "docs": {
                                          "Output.html#sendStart": {
                                            "ref": "Output.html#sendStart",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "o": {
                                    "docs": {},
                                    "p": {
                                      "docs": {
                                        "Output.html#sendStop": {
                                          "ref": "Output.html#sendStop",
                                          "tf": 1150
                                        }
                                      }
                                    }
                                  }
                                },
                                "y": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "x": {
                                        "docs": {
                                          "Output.html#sendSysex": {
                                            "ref": "Output.html#sendSysex",
                                            "tf": 1150
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "t": {
                                "docs": {},
                                "i": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "c": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "d": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "q": {
                                                "docs": {},
                                                "u": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "r": {
                                                      "docs": {},
                                                      "t": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "f": {
                                                              "docs": {},
                                                              "r": {
                                                                "docs": {},
                                                                "a": {
                                                                  "docs": {},
                                                                  "m": {
                                                                    "docs": {
                                                                      "Output.html#sendTimecodeQuarterFrame": {
                                                                        "ref": "Output.html#sendTimecodeQuarterFrame",
                                                                        "tf": 1150
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "u": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "q": {
                                            "docs": {},
                                            "u": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {
                                                      "Output.html#sendTuneRequest": {
                                                        "ref": "Output.html#sendTuneRequest",
                                                        "tf": 1150
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "t": {
                            "docs": {},
                            "p": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "c": {
                                    "docs": {},
                                    "h": {
                                      "docs": {},
                                      "b": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "n": {
                                            "docs": {},
                                            "d": {
                                              "docs": {},
                                              "r": {
                                                "docs": {},
                                                "a": {
                                                  "docs": {},
                                                  "n": {
                                                    "docs": {},
                                                    "g": {
                                                      "docs": {
                                                        "Output.html#setPitchBendRange": {
                                                          "ref": "Output.html#setPitchBendRange",
                                                          "tf": 1150
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "r": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "g": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "s": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "d": {
                                                "docs": {},
                                                "p": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "r": {
                                                      "docs": {},
                                                      "a": {
                                                        "docs": {},
                                                        "m": {
                                                          "docs": {},
                                                          "e": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {
                                                                "Output.html#setRegisteredParameter": {
                                                                  "ref": "Output.html#setRegisteredParameter",
                                                                  "tf": 1150
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "t": {
                        "docs": {},
                        "y": {
                          "docs": {},
                          "p": {
                            "docs": {
                              "Output.html#type": {
                                "ref": "Output.html#type",
                                "tf": 1150
                              }
                            }
                          }
                        }
                      },
                      "d": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "y": {
                                    "docs": {
                                      "Output.html#destroy": {
                                        "ref": "Output.html#destroy",
                                        "tf": 1150
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "o": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "n": {
                              "docs": {
                                "Output.html#open": {
                                  "ref": "Output.html#open",
                                  "tf": 1150
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "c": {
                      "docs": {},
                      "h": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "l": {
                                  "docs": {
                                    "Output.html#channels": {
                                      "ref": "Output.html#channels",
                                      "tf": 5.555555555555555
                                    },
                                    "OutputChannel.html": {
                                      "ref": "OutputChannel.html",
                                      "tf": 1925
                                    },
                                    "OutputChannel.html#sendKeyAftertouch": {
                                      "ref": "OutputChannel.html#sendKeyAftertouch",
                                      "tf": 20
                                    }
                                  },
                                  "#": {
                                    "docs": {},
                                    "n": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "m": {
                                          "docs": {},
                                          "b": {
                                            "docs": {
                                              "OutputChannel.html#number": {
                                                "ref": "OutputChannel.html#number",
                                                "tf": 1150
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "o": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "p": {
                                            "docs": {},
                                            "u": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "OutputChannel.html#output": {
                                                    "ref": "OutputChannel.html#output",
                                                    "tf": 1150
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "s": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "d": {
                                            "docs": {
                                              "OutputChannel.html#send": {
                                                "ref": "OutputChannel.html#send",
                                                "tf": 1150
                                              }
                                            },
                                            "c": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "n": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {},
                                                    "r": {
                                                      "docs": {},
                                                      "o": {
                                                        "docs": {},
                                                        "l": {
                                                          "docs": {},
                                                          "c": {
                                                            "docs": {},
                                                            "h": {
                                                              "docs": {},
                                                              "a": {
                                                                "docs": {},
                                                                "n": {
                                                                  "docs": {},
                                                                  "g": {
                                                                    "docs": {
                                                                      "OutputChannel.html#sendControlChange": {
                                                                        "ref": "OutputChannel.html#sendControlChange",
                                                                        "tf": 1150
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              },
                                              "h": {
                                                "docs": {},
                                                "a": {
                                                  "docs": {},
                                                  "n": {
                                                    "docs": {},
                                                    "n": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "l": {
                                                          "docs": {},
                                                          "a": {
                                                            "docs": {},
                                                            "f": {
                                                              "docs": {},
                                                              "t": {
                                                                "docs": {},
                                                                "e": {
                                                                  "docs": {},
                                                                  "r": {
                                                                    "docs": {},
                                                                    "t": {
                                                                      "docs": {},
                                                                      "o": {
                                                                        "docs": {},
                                                                        "u": {
                                                                          "docs": {},
                                                                          "c": {
                                                                            "docs": {},
                                                                            "h": {
                                                                              "docs": {
                                                                                "OutputChannel.html#sendKeyAftertouch": {
                                                                                  "ref": "OutputChannel.html#sendKeyAftertouch",
                                                                                  "tf": 3.125
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            },
                                            "k": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "y": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "f": {
                                                      "docs": {},
                                                      "t": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {},
                                                              "o": {
                                                                "docs": {},
                                                                "u": {
                                                                  "docs": {},
                                                                  "c": {
                                                                    "docs": {},
                                                                    "h": {
                                                                      "docs": {
                                                                        "OutputChannel.html#sendKeyAftertouch": {
                                                                          "ref": "OutputChannel.html#sendKeyAftertouch",
                                                                          "tf": 1150
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "|": {
                      "docs": {},
                      "f": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "s": {
                              "docs": {
                                "WebMidi.html#getOutputById": {
                                  "ref": "WebMidi.html#getOutputById",
                                  "tf": 33.33333333333333
                                },
                                "WebMidi.html#getOutputByName": {
                                  "ref": "WebMidi.html#getOutputByName",
                                  "tf": 33.33333333333333
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "g": {
                "docs": {},
                "o": {
                  "docs": {
                    "WebMidi.html": {
                      "ref": "WebMidi.html",
                      "tf": 0.8620689655172413
                    }
                  }
                }
              },
              "b": {
                "docs": {},
                "o": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "d": {
                        "docs": {
                          "WebMidi.html#octaveOffset": {
                            "ref": "WebMidi.html#octaveOffset",
                            "tf": 1.3513513513513513
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {
              "Output.html#send": {
                "ref": "Output.html#send",
                "tf": 1.282051282051282
              },
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "Output.html#setRegisteredParameter": {
                "ref": "Output.html#setRegisteredParameter",
                "tf": 0.3184713375796179
              },
              "OutputChannel.html#send": {
                "ref": "OutputChannel.html#send",
                "tf": 1.4285714285714286
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.2890173410404624
              },
              "WebMidi.html#time": {
                "ref": "WebMidi.html#time",
                "tf": 1.5625
              },
              "WebMidi.html#getInputById": {
                "ref": "WebMidi.html#getInputById",
                "tf": 1.4705882352941175
              },
              "WebMidi.html#getInputByName": {
                "ref": "WebMidi.html#getInputByName",
                "tf": 2
              },
              "WebMidi.html#getOutputById": {
                "ref": "WebMidi.html#getOutputById",
                "tf": 1.4705882352941175
              },
              "WebMidi.html#getOutputByName": {
                "ref": "WebMidi.html#getOutputByName",
                "tf": 2
              },
              "WebMidi.html#sanitizeChannels": {
                "ref": "WebMidi.html#sanitizeChannels",
                "tf": 1.0204081632653061
              }
            }
          },
          "t": {
            "docs": {},
            "h": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "Output.html#sendControlChange": {
                      "ref": "Output.html#sendControlChange",
                      "tf": 0.2890173410404624
                    },
                    "OutputChannel.html#sendControlChange": {
                      "ref": "OutputChannel.html#sendControlChange",
                      "tf": 0.2890173410404624
                    }
                  },
                  "w": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "s": {
                        "docs": {
                          "WebMidi.html#convertToTimestamp": {
                            "ref": "WebMidi.html#convertToTimestamp",
                            "tf": 2.7777777777777777
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "v": {
            "docs": {},
            "e": {
              "docs": {},
              "r": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  }
                }
              }
            }
          },
          "m": {
            "docs": {},
            "n": {
              "docs": {},
              "i": {
                "docs": {},
                "m": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "d": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "f": {
                            "docs": {},
                            "f": {
                              "docs": {
                                "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                                  "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                                  "tf": 2.1739130434782608
                                }
                              }
                            }
                          },
                          "n": {
                            "docs": {
                              "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                                "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                                "tf": 2.1739130434782608
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "c": {
            "docs": {},
            "t": {
              "docs": {},
              "a": {
                "docs": {},
                "v": {
                  "docs": {
                    "WebMidi.html#octaveOffset": {
                      "ref": "WebMidi.html#octaveOffset",
                      "tf": 2.7027027027027026
                    },
                    "WebMidi.html#getNoteNumberByName": {
                      "ref": "WebMidi.html#getNoteNumberByName",
                      "tf": 0.5681818181818182
                    },
                    "WebMidi.html#getOctave": {
                      "ref": "WebMidi.html#getOctave",
                      "tf": 3.8461538461538463
                    }
                  },
                  "e": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "f": {
                        "docs": {},
                        "f": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "t": {
                                "docs": {
                                  "WebMidi.html#octaveOffset": {
                                    "ref": "WebMidi.html#octaveOffset",
                                    "tf": 702.7027027027027
                                  },
                                  "WebMidi.html#getNoteNumberByName": {
                                    "ref": "WebMidi.html#getNoteNumberByName",
                                    "tf": 1.1363636363636365
                                  },
                                  "WebMidi.html#getOctave": {
                                    "ref": "WebMidi.html#getOctave",
                                    "tf": 1.282051282051282
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "f": {
            "docs": {},
            "f": {
              "docs": {},
              "s": {
                "docs": {},
                "e": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "WebMidi.html#octaveOffset": {
                        "ref": "WebMidi.html#octaveOffset",
                        "tf": 1.3513513513513513
                      },
                      "WebMidi.html#getNoteNumberByName": {
                        "ref": "WebMidi.html#getNoteNumberByName",
                        "tf": 0.5681818181818182
                      },
                      "WebMidi.html#getOctave": {
                        "ref": "WebMidi.html#getOctave",
                        "tf": 1.282051282051282
                      }
                    }
                  }
                }
              },
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "WebMidi.html#supported": {
                      "ref": "WebMidi.html#supported",
                      "tf": 1.7241379310344827
                    }
                  }
                }
              }
            }
          }
        },
        "p": {
          "docs": {},
          "o": {
            "docs": {},
            "r": {
              "docs": {},
              "t": {
                "docs": {
                  "Input.html": {
                    "ref": "Input.html",
                    "tf": 2.083333333333333
                  },
                  "Input.html#id": {
                    "ref": "Input.html#id",
                    "tf": 4.3478260869565215
                  },
                  "Input.html#manufacturer": {
                    "ref": "Input.html#manufacturer",
                    "tf": 7.142857142857142
                  },
                  "Input.html#state": {
                    "ref": "Input.html#state",
                    "tf": 10
                  },
                  "Input.html#type": {
                    "ref": "Input.html#type",
                    "tf": 12.5
                  },
                  "Output.html": {
                    "ref": "Output.html",
                    "tf": 2.083333333333333
                  },
                  "Output.html#id": {
                    "ref": "Output.html#id",
                    "tf": 2.1739130434782608
                  },
                  "Output.html#manufacturer": {
                    "ref": "Output.html#manufacturer",
                    "tf": 7.142857142857142
                  },
                  "Output.html#state": {
                    "ref": "Output.html#state",
                    "tf": 10
                  },
                  "Output.html#type": {
                    "ref": "Output.html#type",
                    "tf": 12.5
                  },
                  "Output.html#send": {
                    "ref": "Output.html#send",
                    "tf": 1.282051282051282
                  },
                  "Output.html#sendActiveSensing": {
                    "ref": "Output.html#sendActiveSensing",
                    "tf": 4.545454545454546
                  },
                  "WebMidi.html#getInputByName": {
                    "ref": "WebMidi.html#getInputByName",
                    "tf": 2
                  },
                  "WebMidi.html#getOutputByName": {
                    "ref": "WebMidi.html#getOutputByName",
                    "tf": 2
                  }
                },
                "'": {
                  "docs": {
                    "Input.html#connection": {
                      "ref": "Input.html#connection",
                      "tf": 7.142857142857142
                    },
                    "Output.html#connection": {
                      "ref": "Output.html#connection",
                      "tf": 7.142857142857142
                    }
                  }
                },
                "a": {
                  "docs": {},
                  "m": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "o": {
                            "docs": {
                              "Output.html#sendControlChange": {
                                "ref": "Output.html#sendControlChange",
                                "tf": 0.2890173410404624
                              },
                              "OutputChannel.html#sendControlChange": {
                                "ref": "OutputChannel.html#sendControlChange",
                                "tf": 0.2890173410404624
                              },
                              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                "tf": 0.4032258064516129
                              }
                            },
                            "t": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "m": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "s": {
                                              "docs": {
                                                "Output.html#sendControlChange": {
                                                  "ref": "Output.html#sendControlChange",
                                                  "tf": 0.2890173410404624
                                                },
                                                "OutputChannel.html#sendControlChange": {
                                                  "ref": "OutputChannel.html#sendControlChange",
                                                  "tf": 0.2890173410404624
                                                },
                                                "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                  "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                  "tf": 0.4032258064516129
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "f": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "n": {
                                          "docs": {
                                            "Output.html#sendControlChange": {
                                              "ref": "Output.html#sendControlChange",
                                              "tf": 0.2890173410404624
                                            },
                                            "OutputChannel.html#sendControlChange": {
                                              "ref": "OutputChannel.html#sendControlChange",
                                              "tf": 0.2890173410404624
                                            },
                                            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                              "tf": 0.4032258064516129
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "s": {
                  "docs": {},
                  ".": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "WebMidi.html#enable": {
                                  "ref": "WebMidi.html#enable",
                                  "tf": 0.2857142857142857
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "o": {
                      "docs": {},
                      "u": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "p": {
                            "docs": {},
                            "u": {
                              "docs": {},
                              "t": {
                                "docs": {
                                  "WebMidi.html#enable": {
                                    "ref": "WebMidi.html#enable",
                                    "tf": 0.2857142857142857
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "i": {
                "docs": {},
                "t": {
                  "docs": {
                    "Output.html#sendContinue": {
                      "ref": "Output.html#sendContinue",
                      "tf": 2.380952380952381
                    },
                    "Output.html#sendSongPosition": {
                      "ref": "Output.html#sendSongPosition",
                      "tf": 5.263157894736842
                    },
                    "Output.html#sendSongSelect": {
                      "ref": "Output.html#sendSongSelect",
                      "tf": 7.142857142857142
                    },
                    "Output.html#sendSysex": {
                      "ref": "Output.html#sendSysex",
                      "tf": 0.33333333333333337
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "y": {
                "docs": {},
                "m": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "d": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "n": {
                            "docs": {
                              "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                                "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                                "tf": 2.1739130434782608
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "n": {
                "docs": {},
                "t": {
                  "docs": {
                    "WebMidi.html#time": {
                      "ref": "WebMidi.html#time",
                      "tf": 1.5625
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "r": {
              "docs": {},
              "a": {
                "docs": {},
                "m": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Input.html#.NRPN_TYPES": {
                          "ref": "Input.html#.NRPN_TYPES",
                          "tf": 6.25
                        },
                        "Input.html#nrpnEventsEnabled": {
                          "ref": "Input.html#nrpnEventsEnabled",
                          "tf": 1.0869565217391304
                        },
                        "Output.html#sendSysex": {
                          "ref": "Output.html#sendSysex",
                          "tf": 0.6666666666666667
                        },
                        "Output.html#setPitchBendRange": {
                          "ref": "Output.html#setPitchBendRange",
                          "tf": 5.357142857142857
                        },
                        "Output.html#setRegisteredParameter": {
                          "ref": "Output.html#setRegisteredParameter",
                          "tf": 18.57749469214437
                        },
                        "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                          "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                          "tf": 1.5625
                        },
                        "WebMidi.html#convertToTimestamp": {
                          "ref": "WebMidi.html#convertToTimestamp",
                          "tf": 2.7777777777777777
                        },
                        "WebMidi.html#getNoteNumberByName": {
                          "ref": "WebMidi.html#getNoteNumberByName",
                          "tf": 0.5681818181818182
                        },
                        "WebMidi.html#guessNoteNumber": {
                          "ref": "WebMidi.html#guessNoteNumber",
                          "tf": 1.25
                        },
                        "WebMidi.html#sanitizeChannels": {
                          "ref": "WebMidi.html#sanitizeChannels",
                          "tf": 3.061224489795918
                        }
                      }
                    }
                  },
                  "l": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "b": {
                        "docs": {
                          "WebMidi.html#MIDI_NRPN_MESSAGES": {
                            "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                            "tf": 2
                          }
                        }
                      }
                    }
                  },
                  "m": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "b": {
                        "docs": {
                          "WebMidi.html#MIDI_NRPN_MESSAGES": {
                            "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                            "tf": 2
                          }
                        }
                      }
                    }
                  }
                }
              },
              "t": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  }
                }
              },
              "s": {
                "docs": {
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 0.5681818181818182
                  },
                  "WebMidi.html#getOctave": {
                    "ref": "WebMidi.html#getOctave",
                    "tf": 1.282051282051282
                  },
                  "WebMidi.html#sanitizeChannels": {
                    "ref": "WebMidi.html#sanitizeChannels",
                    "tf": 1.0204081632653061
                  }
                }
              }
            },
            "n": {
              "docs": {
                "Output.html#setRegisteredParameter": {
                  "ref": "Output.html#setRegisteredParameter",
                  "tf": 0.3184713375796179
                }
              },
              "c": {
                "docs": {},
                "o": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "s": {
                        "docs": {
                          "Output.html#sendControlChange": {
                            "ref": "Output.html#sendControlChange",
                            "tf": 0.2890173410404624
                          },
                          "OutputChannel.html#sendControlChange": {
                            "ref": "OutputChannel.html#sendControlChange",
                            "tf": 0.2890173410404624
                          },
                          "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                            "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                            "tf": 0.4032258064516129
                          }
                        }
                      }
                    }
                  }
                }
              },
              "f": {
                "docs": {},
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "Output.html#sendControlChange": {
                        "ref": "Output.html#sendControlChange",
                        "tf": 0.2890173410404624
                      },
                      "OutputChannel.html#sendControlChange": {
                        "ref": "OutputChannel.html#sendControlChange",
                        "tf": 0.2890173410404624
                      },
                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                        "tf": 0.4032258064516129
                      }
                    }
                  }
                }
              },
              "s": {
                "docs": {},
                "p": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "d": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "g": {
                                "docs": {},
                                "l": {
                                  "docs": {
                                    "Output.html#setRegisteredParameter": {
                                      "ref": "Output.html#setRegisteredParameter",
                                      "tf": 0.3184713375796179
                                    },
                                    "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                      "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                      "tf": 0.78125
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "g": {
              "docs": {},
              "e": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  },
                  "WebMidi.html#time": {
                    "ref": "WebMidi.html#time",
                    "tf": 1.5625
                  },
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.2857142857142857
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "r": {
                "docs": {
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 0.78125
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "s": {
                "docs": {
                  "WebMidi.html#time": {
                    "ref": "WebMidi.html#time",
                    "tf": 1.5625
                  },
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.2857142857142857
                  },
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 1.1363636363636365
                  },
                  "WebMidi.html#guessNoteNumber": {
                    "ref": "WebMidi.html#guessNoteNumber",
                    "tf": 1.25
                  },
                  "WebMidi.html#sanitizeChannels": {
                    "ref": "WebMidi.html#sanitizeChannels",
                    "tf": 2.0408163265306123
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "n": {
              "docs": {},
              "d": {
                "docs": {
                  "Input.html#connection": {
                    "ref": "Input.html#connection",
                    "tf": 7.142857142857142
                  },
                  "Output.html#connection": {
                    "ref": "Output.html#connection",
                    "tf": 7.142857142857142
                  }
                }
              }
            },
            "r": {
              "docs": {
                "WebMidi.html#getInputById": {
                  "ref": "WebMidi.html#getInputById",
                  "tf": 1.4705882352941175
                },
                "WebMidi.html#getNoteNumberByName": {
                  "ref": "WebMidi.html#getNoteNumberByName",
                  "tf": 0.5681818181818182
                },
                "WebMidi.html#getOutputById": {
                  "ref": "WebMidi.html#getOutputById",
                  "tf": 1.4705882352941175
                }
              }
            }
          },
          "l": {
            "docs": {},
            "a": {
              "docs": {},
              "t": {
                "docs": {},
                "f": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "m": {
                        "docs": {
                          "Input.html#id": {
                            "ref": "Input.html#id",
                            "tf": 2.1739130434782608
                          },
                          "Output.html#id": {
                            "ref": "Output.html#id",
                            "tf": 2.1739130434782608
                          },
                          "Output.html#sendSysex": {
                            "ref": "Output.html#sendSysex",
                            "tf": 0.33333333333333337
                          }
                        }
                      }
                    }
                  }
                }
              },
              "y": {
                "docs": {},
                "n": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Output.html#send": {
                          "ref": "Output.html#send",
                          "tf": 1.282051282051282
                        },
                        "OutputChannel.html#send": {
                          "ref": "OutputChannel.html#send",
                          "tf": 1.4285714285714286
                        }
                      }
                    }
                  }
                },
                "b": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "k": {
                        "docs": {
                          "Output.html#sendContinue": {
                            "ref": "Output.html#sendContinue",
                            "tf": 4.761904761904762
                          },
                          "Output.html#sendStart": {
                            "ref": "Output.html#sendStart",
                            "tf": 4.761904761904762
                          },
                          "Output.html#sendStop": {
                            "ref": "Output.html#sendStop",
                            "tf": 3.571428571428571
                          }
                        }
                      }
                    }
                  }
                }
              },
              "c": {
                "docs": {},
                "e": {
                  "docs": {
                    "WebMidi.html#octaveOffset": {
                      "ref": "WebMidi.html#octaveOffset",
                      "tf": 1.3513513513513513
                    },
                    "WebMidi.html#getOctave": {
                      "ref": "WebMidi.html#getOctave",
                      "tf": 1.282051282051282
                    }
                  }
                }
              }
            },
            "u": {
              "docs": {
                "WebMidi.html#convertToTimestamp": {
                  "ref": "WebMidi.html#convertToTimestamp",
                  "tf": 1.3888888888888888
                }
              },
              "g": {
                "docs": {},
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "Input.html#id": {
                        "ref": "Input.html#id",
                        "tf": 2.1739130434782608
                      },
                      "Output.html#id": {
                        "ref": "Output.html#id",
                        "tf": 2.1739130434782608
                      },
                      "WebMidi.html#supported": {
                        "ref": "WebMidi.html#supported",
                        "tf": 1.7241379310344827
                      },
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.2857142857142857
                      },
                      "WebMidi.html#getInputById": {
                        "ref": "WebMidi.html#getInputById",
                        "tf": 1.4705882352941175
                      },
                      "WebMidi.html#getInputByName": {
                        "ref": "WebMidi.html#getInputByName",
                        "tf": 2
                      },
                      "WebMidi.html#getOutputById": {
                        "ref": "WebMidi.html#getOutputById",
                        "tf": 1.4705882352941175
                      },
                      "WebMidi.html#getOutputByName": {
                        "ref": "WebMidi.html#getOutputByName",
                        "tf": 2
                      }
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "a": {
                "docs": {},
                "s": {
                  "docs": {
                    "Output.html#sendControlChange": {
                      "ref": "Output.html#sendControlChange",
                      "tf": 0.2890173410404624
                    },
                    "Output.html#sendTimecodeQuarterFrame": {
                      "ref": "Output.html#sendTimecodeQuarterFrame",
                      "tf": 2.5
                    },
                    "OutputChannel.html#sendControlChange": {
                      "ref": "OutputChannel.html#sendControlChange",
                      "tf": 0.2890173410404624
                    },
                    "WebMidi.html#getInputById": {
                      "ref": "WebMidi.html#getInputById",
                      "tf": 1.4705882352941175
                    },
                    "WebMidi.html#getOutputById": {
                      "ref": "WebMidi.html#getOutputById",
                      "tf": 1.4705882352941175
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "o": {
              "docs": {},
              "m": {
                "docs": {},
                "i": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 1.1428571428571428
                      }
                    },
                    "e": {
                      "docs": {},
                      ".": {
                        "docs": {},
                        "&": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              ";": {
                                "docs": {},
                                "v": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "d": {
                                        "docs": {},
                                        "&": {
                                          "docs": {},
                                          "g": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "Input.html#destroy": {
                                                  "ref": "Input.html#destroy",
                                                  "tf": 33.33333333333333
                                                },
                                                "Output.html#destroy": {
                                                  "ref": "Output.html#destroy",
                                                  "tf": 33.33333333333333
                                                },
                                                "WebMidi.html#disable": {
                                                  "ref": "WebMidi.html#disable",
                                                  "tf": 33.33333333333333
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "i": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "p": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "&": {
                                            "docs": {},
                                            "g": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "Input.html#open": {
                                                    "ref": "Input.html#open",
                                                    "tf": 33.33333333333333
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "(": {
                                  "docs": {},
                                  "v": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "d": {
                                          "docs": {},
                                          "|": {
                                            "docs": {},
                                            "a": {
                                              "docs": {},
                                              "n": {
                                                "docs": {},
                                                "y": {
                                                  "docs": {},
                                                  ")": {
                                                    "docs": {},
                                                    "&": {
                                                      "docs": {},
                                                      "g": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {
                                                            "Output.html#close": {
                                                              "ref": "Output.html#close",
                                                              "tf": 33.33333333333333
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "o": {
                                  "docs": {},
                                  "u": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "p": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "&": {
                                              "docs": {},
                                              "g": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "Output.html#open": {
                                                      "ref": "Output.html#open",
                                                      "tf": 33.33333333333333
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "b": {
                                    "docs": {},
                                    "j": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "c": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "&": {
                                              "docs": {},
                                              "g": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "WebMidi.html#enable": {
                                                      "ref": "WebMidi.html#enable",
                                                      "tf": 25
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "p": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.5714285714285714
                      }
                    }
                  }
                }
              },
              "c": {
                "docs": {},
                "e": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "s": {
                      "docs": {
                        "Output.html#sendTimecodeQuarterFrame": {
                          "ref": "Output.html#sendTimecodeQuarterFrame",
                          "tf": 2.5
                        },
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.2857142857142857
                        }
                      }
                    }
                  }
                }
              },
              "b": {
                "docs": {},
                "a": {
                  "docs": {},
                  "b": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "Output.html#setRegisteredParameter": {
                          "ref": "Output.html#setRegisteredParameter",
                          "tf": 0.3184713375796179
                        }
                      }
                    }
                  }
                }
              },
              "g": {
                "docs": {},
                "r": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "m": {
                      "docs": {
                        "Output.html#setRegisteredParameter": {
                          "ref": "Output.html#setRegisteredParameter",
                          "tf": 0.6369426751592357
                        }
                      },
                      "c": {
                        "docs": {},
                        "h": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "g": {
                                "docs": {
                                  "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                                    "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                                    "tf": 1.4285714285714286
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "p": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "WebMidi.html#supported": {
                            "ref": "WebMidi.html#supported",
                            "tf": 1.7241379310344827
                          },
                          "WebMidi.html#enable": {
                            "ref": "WebMidi.html#enable",
                            "tf": 0.5714285714285714
                          },
                          "WebMidi.html#getOctave": {
                            "ref": "WebMidi.html#getOctave",
                            "tf": 1.282051282051282
                          }
                        }
                      }
                    }
                  }
                }
              },
              "v": {
                "docs": {},
                "i": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "WebMidi.html#supported": {
                        "ref": "WebMidi.html#supported",
                        "tf": 1.7241379310344827
                      }
                    }
                  }
                }
              },
              "o": {
                "docs": {},
                "f": {
                  "docs": {
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.2857142857142857
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "s": {
                "docs": {},
                "s": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "Output.html#sendChannelAftertouch": {
                          "ref": "Output.html#sendChannelAftertouch",
                          "tf": 20
                        },
                        "Output.html#sendKeyAftertouch": {
                          "ref": "Output.html#sendKeyAftertouch",
                          "tf": 16.666666666666664
                        },
                        "OutputChannel.html#sendKeyAftertouch": {
                          "ref": "OutputChannel.html#sendKeyAftertouch",
                          "tf": 20
                        }
                      }
                    }
                  }
                }
              },
              "v": {
                "docs": {},
                "i": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "s": {
                        "docs": {
                          "Output.html#sendContinue": {
                            "ref": "Output.html#sendContinue",
                            "tf": 2.380952380952381
                          }
                        }
                      }
                    }
                  }
                }
              },
              "p": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "Output.html#sendSysex": {
                          "ref": "Output.html#sendSysex",
                          "tf": 0.33333333333333337
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "a": {
              "docs": {},
              "s": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "v": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "l": {
                              "docs": {
                                "Output.html#sendControlChange": {
                                  "ref": "Output.html#sendControlChange",
                                  "tf": 0.2890173410404624
                                },
                                "OutputChannel.html#sendControlChange": {
                                  "ref": "OutputChannel.html#sendControlChange",
                                  "tf": 0.2890173410404624
                                },
                                "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                  "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                  "tf": 0.4032258064516129
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "t": {
              "docs": {},
              "c": {
                "docs": {},
                "h": {
                  "docs": {
                    "Output.html#setPitchBendRange": {
                      "ref": "Output.html#setPitchBendRange",
                      "tf": 3.571428571428571
                    },
                    "WebMidi.html#getNoteNumberByName": {
                      "ref": "WebMidi.html#getNoteNumberByName",
                      "tf": 0.5681818181818182
                    }
                  },
                  "b": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "d": {
                          "docs": {
                            "Output.html#setRegisteredParameter": {
                              "ref": "Output.html#setRegisteredParameter",
                              "tf": 0.3184713375796179
                            },
                            "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                              "tf": 1.4285714285714286
                            }
                          },
                          "r": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "n": {
                                "docs": {},
                                "g": {
                                  "docs": {
                                    "Output.html#setRegisteredParameter": {
                                      "ref": "Output.html#setRegisteredParameter",
                                      "tf": 0.3184713375796179
                                    },
                                    "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                                      "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                                      "tf": 0.78125
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "r": {
              "docs": {},
              "p": {
                "docs": {},
                "o": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                        "tf": 0.5617977528089888
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "s": {
          "docs": {
            "WebMidi.html#time": {
              "ref": "WebMidi.html#time",
              "tf": 1.5625
            }
          },
          "u": {
            "docs": {},
            "b": {
              "docs": {
                "WebMidi.html#time": {
                  "ref": "WebMidi.html#time",
                  "tf": 1.5625
                }
              },
              "s": {
                "docs": {},
                "y": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "m": {
                          "docs": {
                            "Input.html": {
                              "ref": "Input.html",
                              "tf": 2.083333333333333
                            },
                            "Output.html": {
                              "ref": "Output.html",
                              "tf": 2.083333333333333
                            },
                            "WebMidi.html#enabled": {
                              "ref": "WebMidi.html#enabled",
                              "tf": 7.142857142857142
                            },
                            "WebMidi.html#enable": {
                              "ref": "WebMidi.html#enable",
                              "tf": 0.2857142857142857
                            }
                          },
                          "'": {
                            "docs": {
                              "WebMidi.html#disable": {
                                "ref": "WebMidi.html#disable",
                                "tf": 2.272727272727273
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "h": {
                "docs": {
                  "Input.html#nrpnEventsEnabled": {
                    "ref": "Input.html#nrpnEventsEnabled",
                    "tf": 1.0869565217391304
                  },
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  }
                }
              },
              "c": {
                "docs": {},
                "e": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "f": {
                        "docs": {},
                        "u": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "l": {
                              "docs": {},
                              "i": {
                                "docs": {
                                  "WebMidi.html#sanitizeChannels": {
                                    "ref": "WebMidi.html#sanitizeChannels",
                                    "tf": 1.0204081632653061
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {
                "WebMidi.html#convertToTimestamp": {
                  "ref": "WebMidi.html#convertToTimestamp",
                  "tf": 1.3888888888888888
                }
              },
              "m": {
                "docs": {},
                "a": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "i": {
                      "docs": {
                        "Output.html#send": {
                          "ref": "Output.html#send",
                          "tf": 1.282051282051282
                        },
                        "OutputChannel.html#send": {
                          "ref": "OutputChannel.html#send",
                          "tf": 1.4285714285714286
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "p": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "d": {
                                "docs": {
                                  "Output.html#sendControlChange": {
                                    "ref": "Output.html#sendControlChange",
                                    "tf": 0.2890173410404624
                                  },
                                  "OutputChannel.html#sendControlChange": {
                                    "ref": "OutputChannel.html#sendControlChange",
                                    "tf": 0.2890173410404624
                                  },
                                  "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                    "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                    "tf": 0.4032258064516129
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "g": {
              "docs": {},
              "g": {
                "docs": {},
                "e": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Output.html#sendSysex": {
                          "ref": "Output.html#sendSysex",
                          "tf": 0.33333333333333337
                        }
                      }
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "p": {
                "docs": {},
                "o": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Output.html#sendSysex": {
                          "ref": "Output.html#sendSysex",
                          "tf": 0.6666666666666667
                        },
                        "WebMidi.html#supported": {
                          "ref": "WebMidi.html#supported",
                          "tf": 688.5057471264369
                        },
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.2857142857142857
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            "a": {
              "docs": {},
              "t": {
                "docs": {},
                "e": {
                  "docs": {
                    "Input.html#connection": {
                      "ref": "Input.html#connection",
                      "tf": 7.142857142857142
                    },
                    "Input.html#state": {
                      "ref": "Input.html#state",
                      "tf": 693.3333333333334
                    },
                    "Output.html#connection": {
                      "ref": "Output.html#connection",
                      "tf": 7.142857142857142
                    },
                    "Output.html#state": {
                      "ref": "Output.html#state",
                      "tf": 693.3333333333334
                    },
                    "Output.html#sendReset": {
                      "ref": "Output.html#sendReset",
                      "tf": 3.8461538461538463
                    },
                    "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                      "tf": 0.5617977528089888
                    }
                  }
                },
                "u": {
                  "docs": {
                    "Output.html#send": {
                      "ref": "Output.html#send",
                      "tf": 20
                    },
                    "OutputChannel.html#send": {
                      "ref": "OutputChannel.html#send",
                      "tf": 20
                    }
                  }
                }
              },
              "n": {
                "docs": {},
                "d": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "d": {
                        "docs": {
                          "Output.html#sendClock": {
                            "ref": "Output.html#sendClock",
                            "tf": 3.8461538461538463
                          },
                          "Output.html#setRegisteredParameter": {
                            "ref": "Output.html#setRegisteredParameter",
                            "tf": 0.6369426751592357
                          },
                          "WebMidi.html#NOTES": {
                            "ref": "WebMidi.html#NOTES",
                            "tf": 12.5
                          },
                          "WebMidi.html#getNoteNumberByName": {
                            "ref": "WebMidi.html#getNoteNumberByName",
                            "tf": 0.5681818181818182
                          }
                        }
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "t": {
                  "docs": {
                    "Output.html#sendContinue": {
                      "ref": "Output.html#sendContinue",
                      "tf": 4.761904761904762
                    },
                    "Output.html#sendSongPosition": {
                      "ref": "Output.html#sendSongPosition",
                      "tf": 2.631578947368421
                    },
                    "Output.html#sendStart": {
                      "ref": "Output.html#sendStart",
                      "tf": 9.523809523809524
                    },
                    "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                      "tf": 0.5617977528089888
                    },
                    "WebMidi.html#convertToTimestamp": {
                      "ref": "WebMidi.html#convertToTimestamp",
                      "tf": 2.7777777777777777
                    },
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.2857142857142857
                    }
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "i": {
                "docs": {},
                "n": {
                  "docs": {},
                  "g": {
                    "docs": {
                      "Input.html#connection": {
                        "ref": "Input.html#connection",
                        "tf": 33.33333333333333
                      },
                      "Input.html#id": {
                        "ref": "Input.html#id",
                        "tf": 35.50724637681159
                      },
                      "Input.html#manufacturer": {
                        "ref": "Input.html#manufacturer",
                        "tf": 33.33333333333333
                      },
                      "Input.html#name": {
                        "ref": "Input.html#name",
                        "tf": 50
                      },
                      "Input.html#state": {
                        "ref": "Input.html#state",
                        "tf": 33.33333333333333
                      },
                      "Input.html#type": {
                        "ref": "Input.html#type",
                        "tf": 33.33333333333333
                      },
                      "Output.html#connection": {
                        "ref": "Output.html#connection",
                        "tf": 33.33333333333333
                      },
                      "Output.html#id": {
                        "ref": "Output.html#id",
                        "tf": 35.50724637681159
                      },
                      "Output.html#manufacturer": {
                        "ref": "Output.html#manufacturer",
                        "tf": 33.33333333333333
                      },
                      "Output.html#name": {
                        "ref": "Output.html#name",
                        "tf": 33.33333333333333
                      },
                      "Output.html#state": {
                        "ref": "Output.html#state",
                        "tf": 33.33333333333333
                      },
                      "Output.html#type": {
                        "ref": "Output.html#type",
                        "tf": 33.33333333333333
                      },
                      "WebMidi.html#convertToTimestamp": {
                        "ref": "WebMidi.html#convertToTimestamp",
                        "tf": 1.3888888888888888
                      },
                      "WebMidi.html#getInputById": {
                        "ref": "WebMidi.html#getInputById",
                        "tf": 2.941176470588235
                      },
                      "WebMidi.html#getInputByName": {
                        "ref": "WebMidi.html#getInputByName",
                        "tf": 2
                      },
                      "WebMidi.html#getNoteNumberByName": {
                        "ref": "WebMidi.html#getNoteNumberByName",
                        "tf": 0.5681818181818182
                      },
                      "WebMidi.html#getOutputById": {
                        "ref": "WebMidi.html#getOutputById",
                        "tf": 2.941176470588235
                      },
                      "WebMidi.html#getOutputByName": {
                        "ref": "WebMidi.html#getOutputByName",
                        "tf": 2
                      },
                      "WebMidi.html#guessNoteNumber": {
                        "ref": "WebMidi.html#guessNoteNumber",
                        "tf": 1.25
                      }
                    },
                    "|": {
                      "docs": {},
                      "f": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "s": {
                              "docs": {
                                "Input.html#getCcNameByNumber": {
                                  "ref": "Input.html#getCcNameByNumber",
                                  "tf": 33.33333333333333
                                },
                                "Input.html#getChannelModeByNumber": {
                                  "ref": "Input.html#getChannelModeByNumber",
                                  "tf": 33.33333333333333
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "e": {
                "docs": {},
                "a": {
                  "docs": {},
                  "m": {
                    "docs": {
                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                        "tf": 0.5617977528089888
                      }
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "p": {
                "docs": {
                  "Output.html#sendContinue": {
                    "ref": "Output.html#sendContinue",
                    "tf": 2.380952380952381
                  },
                  "Output.html#sendStop": {
                    "ref": "Output.html#sendStop",
                    "tf": 7.142857142857142
                  },
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                },
                "n": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "Output.html#send": {
                          "ref": "Output.html#send",
                          "tf": 1.282051282051282
                        },
                        "OutputChannel.html#send": {
                          "ref": "OutputChannel.html#send",
                          "tf": 1.4285714285714286
                        }
                      }
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "l": {
                "docs": {},
                "l": {
                  "docs": {
                    "Output.html#sendActiveSensing": {
                      "ref": "Output.html#sendActiveSensing",
                      "tf": 2.272727272727273
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "m": {
              "docs": {},
              "e": {
                "docs": {
                  "Input.html#id": {
                    "ref": "Input.html#id",
                    "tf": 4.3478260869565215
                  },
                  "Output.html#id": {
                    "ref": "Output.html#id",
                    "tf": 4.3478260869565215
                  },
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.6666666666666667
                  },
                  "Output.html#setPitchBendRange": {
                    "ref": "Output.html#setPitchBendRange",
                    "tf": 1.7857142857142856
                  },
                  "WebMidi.html#getInputById": {
                    "ref": "WebMidi.html#getInputById",
                    "tf": 1.4705882352941175
                  },
                  "WebMidi.html#getInputByName": {
                    "ref": "WebMidi.html#getInputByName",
                    "tf": 2
                  },
                  "WebMidi.html#getOutputById": {
                    "ref": "WebMidi.html#getOutputById",
                    "tf": 1.4705882352941175
                  },
                  "WebMidi.html#getOutputByName": {
                    "ref": "WebMidi.html#getOutputByName",
                    "tf": 2
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "i": {
                "docs": {},
                "t": {
                  "docs": {
                    "WebMidi.html#sanitizeChannels": {
                      "ref": "WebMidi.html#sanitizeChannels",
                      "tf": 1.0204081632653061
                    }
                  },
                  "i": {
                    "docs": {},
                    "z": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "c": {
                          "docs": {},
                          "h": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "n": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "l": {
                                      "docs": {
                                        "WebMidi.html#sanitizeChannels": {
                                          "ref": "WebMidi.html#sanitizeChannels",
                                          "tf": 683.3333333333334
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "p": {
            "docs": {},
            "e": {
              "docs": {},
              "c": {
                "docs": {
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                },
                "i": {
                  "docs": {},
                  "f": {
                    "docs": {
                      "Input.html#id": {
                        "ref": "Input.html#id",
                        "tf": 2.1739130434782608
                      },
                      "Input.html#nrpnEventsEnabled": {
                        "ref": "Input.html#nrpnEventsEnabled",
                        "tf": 1.0869565217391304
                      },
                      "Output.html#id": {
                        "ref": "Output.html#id",
                        "tf": 2.1739130434782608
                      },
                      "Output.html#clear": {
                        "ref": "Output.html#clear",
                        "tf": 3.8461538461538463
                      },
                      "Output.html#sendChannelAftertouch": {
                        "ref": "Output.html#sendChannelAftertouch",
                        "tf": 3.8461538461538463
                      },
                      "Output.html#sendControlChange": {
                        "ref": "Output.html#sendControlChange",
                        "tf": 0.2890173410404624
                      },
                      "Output.html#sendKeyAftertouch": {
                        "ref": "Output.html#sendKeyAftertouch",
                        "tf": 2.7777777777777777
                      },
                      "Output.html#setRegisteredParameter": {
                        "ref": "Output.html#setRegisteredParameter",
                        "tf": 0.3184713375796179
                      },
                      "OutputChannel.html#sendControlChange": {
                        "ref": "OutputChannel.html#sendControlChange",
                        "tf": 0.2890173410404624
                      },
                      "OutputChannel.html#sendKeyAftertouch": {
                        "ref": "OutputChannel.html#sendKeyAftertouch",
                        "tf": 3.125
                      },
                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                        "tf": 0.5617977528089888
                      },
                      "WebMidi.html#time": {
                        "ref": "WebMidi.html#time",
                        "tf": 1.5625
                      },
                      "WebMidi.html#getInputById": {
                        "ref": "WebMidi.html#getInputById",
                        "tf": 1.4705882352941175
                      },
                      "WebMidi.html#getOutputById": {
                        "ref": "WebMidi.html#getOutputById",
                        "tf": 1.4705882352941175
                      }
                    },
                    "i": {
                      "docs": {
                        "Input.html#getCcNameByNumber": {
                          "ref": "Input.html#getCcNameByNumber",
                          "tf": 3.8461538461538463
                        },
                        "Input.html#getChannelModeByNumber": {
                          "ref": "Input.html#getChannelModeByNumber",
                          "tf": 4.166666666666666
                        },
                        "Output.html#sendChannelAftertouch": {
                          "ref": "Output.html#sendChannelAftertouch",
                          "tf": 3.8461538461538463
                        },
                        "Output.html#sendControlChange": {
                          "ref": "Output.html#sendControlChange",
                          "tf": 0.5780346820809248
                        },
                        "Output.html#sendKeyAftertouch": {
                          "ref": "Output.html#sendKeyAftertouch",
                          "tf": 2.7777777777777777
                        },
                        "Output.html#sendSysex": {
                          "ref": "Output.html#sendSysex",
                          "tf": 0.33333333333333337
                        },
                        "Output.html#setPitchBendRange": {
                          "ref": "Output.html#setPitchBendRange",
                          "tf": 5.357142857142857
                        },
                        "Output.html#setRegisteredParameter": {
                          "ref": "Output.html#setRegisteredParameter",
                          "tf": 0.3184713375796179
                        },
                        "OutputChannel.html#sendControlChange": {
                          "ref": "OutputChannel.html#sendControlChange",
                          "tf": 0.2890173410404624
                        },
                        "WebMidi.html#getInputById": {
                          "ref": "WebMidi.html#getInputById",
                          "tf": 1.4705882352941175
                        },
                        "WebMidi.html#getInputByName": {
                          "ref": "WebMidi.html#getInputByName",
                          "tf": 2
                        },
                        "WebMidi.html#getOctave": {
                          "ref": "WebMidi.html#getOctave",
                          "tf": 1.282051282051282
                        },
                        "WebMidi.html#getOutputById": {
                          "ref": "WebMidi.html#getOutputById",
                          "tf": 1.4705882352941175
                        },
                        "WebMidi.html#getOutputByName": {
                          "ref": "WebMidi.html#getOutputByName",
                          "tf": 2
                        },
                        "WebMidi.html#guessNoteNumber": {
                          "ref": "WebMidi.html#guessNoteNumber",
                          "tf": 1.25
                        }
                      }
                    }
                  },
                  "a": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "WebMidi.html#sanitizeChannels": {
                          "ref": "WebMidi.html#sanitizeChannels",
                          "tf": 2.0408163265306123
                        }
                      }
                    }
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "e": {
                "docs": {},
                "a": {
                  "docs": {},
                  "d": {
                    "docs": {
                      "Output.html#setRegisteredParameter": {
                        "ref": "Output.html#setRegisteredParameter",
                        "tf": 0.3184713375796179
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "q": {
              "docs": {},
              "u": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "c": {
                      "docs": {
                        "Input.html#nrpnEventsEnabled": {
                          "ref": "Input.html#nrpnEventsEnabled",
                          "tf": 2.1739130434782608
                        }
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {
                "Input.html#nrpnEventsEnabled": {
                  "ref": "Input.html#nrpnEventsEnabled",
                  "tf": 1.0869565217391304
                },
                "Output.html#sendSysex": {
                  "ref": "Output.html#sendSysex",
                  "tf": 0.33333333333333337
                },
                "Output.html#setRegisteredParameter": {
                  "ref": "Output.html#setRegisteredParameter",
                  "tf": 0.6369426751592357
                },
                "WebMidi.html#octaveOffset": {
                  "ref": "WebMidi.html#octaveOffset",
                  "tf": 2.7027027027027026
                },
                "WebMidi.html#enable": {
                  "ref": "WebMidi.html#enable",
                  "tf": 0.5714285714285714
                }
              },
              "p": {
                "docs": {},
                "i": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "h": {
                        "docs": {},
                        "b": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "d": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "a": {
                                    "docs": {},
                                    "n": {
                                      "docs": {},
                                      "g": {
                                        "docs": {
                                          "Output.html#setPitchBendRange": {
                                            "ref": "Output.html#setPitchBendRange",
                                            "tf": 666.6666666666666
                                          },
                                          "Output.html#setRegisteredParameter": {
                                            "ref": "Output.html#setRegisteredParameter",
                                            "tf": 0.3184713375796179
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "m": {
                "docs": {},
                "a": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "u": {
                              "docs": {},
                              "n": {
                                "docs": {
                                  "Output.html#setRegisteredParameter": {
                                    "ref": "Output.html#setRegisteredParameter",
                                    "tf": 0.3184713375796179
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "o": {
                  "docs": {},
                  "d": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "n": {
                                        "docs": {},
                                        "g": {
                                          "docs": {
                                            "Output.html#setRegisteredParameter": {
                                              "ref": "Output.html#setRegisteredParameter",
                                              "tf": 0.3184713375796179
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "g": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "d": {
                                  "docs": {},
                                  "p": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "m": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "Output.html#setRegisteredParameter": {
                                                    "ref": "Output.html#setRegisteredParameter",
                                                    "tf": 666.6666666666666
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "d": {
                "docs": {
                  "Output.html#close": {
                    "ref": "Output.html#close",
                    "tf": 6.25
                  },
                  "Output.html#send": {
                    "ref": "Output.html#send",
                    "tf": 671.2820512820513
                  },
                  "Output.html#sendActiveSensing": {
                    "ref": "Output.html#sendActiveSensing",
                    "tf": 2.272727272727273
                  },
                  "Output.html#sendChannelAftertouch": {
                    "ref": "Output.html#sendChannelAftertouch",
                    "tf": 3.8461538461538463
                  },
                  "Output.html#sendClock": {
                    "ref": "Output.html#sendClock",
                    "tf": 3.8461538461538463
                  },
                  "Output.html#sendContinue": {
                    "ref": "Output.html#sendContinue",
                    "tf": 2.380952380952381
                  },
                  "Output.html#sendControlChange": {
                    "ref": "Output.html#sendControlChange",
                    "tf": 0.5780346820809248
                  },
                  "Output.html#sendKeyAftertouch": {
                    "ref": "Output.html#sendKeyAftertouch",
                    "tf": 2.7777777777777777
                  },
                  "Output.html#sendReset": {
                    "ref": "Output.html#sendReset",
                    "tf": 3.8461538461538463
                  },
                  "Output.html#sendSongPosition": {
                    "ref": "Output.html#sendSongPosition",
                    "tf": 2.631578947368421
                  },
                  "Output.html#sendSongSelect": {
                    "ref": "Output.html#sendSongSelect",
                    "tf": 3.571428571428571
                  },
                  "Output.html#sendStart": {
                    "ref": "Output.html#sendStart",
                    "tf": 2.380952380952381
                  },
                  "Output.html#sendStop": {
                    "ref": "Output.html#sendStop",
                    "tf": 3.571428571428571
                  },
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 1.3333333333333335
                  },
                  "Output.html#sendTimecodeQuarterFrame": {
                    "ref": "Output.html#sendTimecodeQuarterFrame",
                    "tf": 2.5
                  },
                  "Output.html#sendTuneRequest": {
                    "ref": "Output.html#sendTuneRequest",
                    "tf": 7.142857142857142
                  },
                  "Output.html#setPitchBendRange": {
                    "ref": "Output.html#setPitchBendRange",
                    "tf": 1.7857142857142856
                  },
                  "OutputChannel.html#send": {
                    "ref": "OutputChannel.html#send",
                    "tf": 671.4285714285714
                  },
                  "OutputChannel.html#sendControlChange": {
                    "ref": "OutputChannel.html#sendControlChange",
                    "tf": 0.5780346820809248
                  },
                  "OutputChannel.html#sendKeyAftertouch": {
                    "ref": "OutputChannel.html#sendKeyAftertouch",
                    "tf": 3.125
                  },
                  "WebMidi.html": {
                    "ref": "WebMidi.html",
                    "tf": 0.8620689655172413
                  }
                },
                "c": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "l": {
                              "docs": {},
                              "c": {
                                "docs": {},
                                "h": {
                                  "docs": {},
                                  "a": {
                                    "docs": {},
                                    "n": {
                                      "docs": {},
                                      "g": {
                                        "docs": {
                                          "Output.html#send": {
                                            "ref": "Output.html#send",
                                            "tf": 1.282051282051282
                                          },
                                          "Output.html#sendControlChange": {
                                            "ref": "Output.html#sendControlChange",
                                            "tf": 666.6666666666666
                                          },
                                          "OutputChannel.html#send": {
                                            "ref": "OutputChannel.html#send",
                                            "tf": 1.4285714285714286
                                          },
                                          "OutputChannel.html#sendControlChange": {
                                            "ref": "OutputChannel.html#sendControlChange",
                                            "tf": 670
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "i": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "u": {
                              "docs": {
                                "Output.html#sendContinue": {
                                  "ref": "Output.html#sendContinue",
                                  "tf": 683.3333333333334
                                },
                                "Output.html#sendStart": {
                                  "ref": "Output.html#sendStart",
                                  "tf": 2.380952380952381
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "h": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "l": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "f": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "u": {
                                              "docs": {},
                                              "c": {
                                                "docs": {},
                                                "h": {
                                                  "docs": {
                                                    "Output.html#sendChannelAftertouch": {
                                                      "ref": "Output.html#sendChannelAftertouch",
                                                      "tf": 670
                                                    },
                                                    "Output.html#sendKeyAftertouch": {
                                                      "ref": "Output.html#sendKeyAftertouch",
                                                      "tf": 2.7777777777777777
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "l": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "c": {
                        "docs": {},
                        "k": {
                          "docs": {
                            "Output.html#sendClock": {
                              "ref": "Output.html#sendClock",
                              "tf": 683.3333333333334
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "s": {
                  "docs": {},
                  "y": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "m": {
                            "docs": {},
                            "m": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "g": {
                                        "docs": {
                                          "Output.html#send": {
                                            "ref": "Output.html#send",
                                            "tf": 1.282051282051282
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "e": {
                        "docs": {},
                        "x": {
                          "docs": {
                            "Output.html#sendSysex": {
                              "ref": "Output.html#sendSysex",
                              "tf": 670.3333333333334
                            }
                          }
                        }
                      }
                    }
                  },
                  "t": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "Output.html#sendContinue": {
                              "ref": "Output.html#sendContinue",
                              "tf": 2.380952380952381
                            },
                            "Output.html#sendStart": {
                              "ref": "Output.html#sendStart",
                              "tf": 683.3333333333334
                            }
                          }
                        }
                      }
                    },
                    "o": {
                      "docs": {},
                      "p": {
                        "docs": {
                          "Output.html#sendStop": {
                            "ref": "Output.html#sendStop",
                            "tf": 683.3333333333334
                          }
                        }
                      }
                    }
                  },
                  "o": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "g": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "s": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "t": {
                                  "docs": {
                                    "Output.html#sendSongPosition": {
                                      "ref": "Output.html#sendSongPosition",
                                      "tf": 675
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "s": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "l": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "c": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "Output.html#sendSongSelect": {
                                        "ref": "Output.html#sendSongSelect",
                                        "tf": 675
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "a": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "v": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "s": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "s": {
                                    "docs": {
                                      "Output.html#sendActiveSensing": {
                                        "ref": "Output.html#sendActiveSensing",
                                        "tf": 683.3333333333334
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "k": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "y": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "f": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "u": {
                                      "docs": {},
                                      "c": {
                                        "docs": {},
                                        "h": {
                                          "docs": {
                                            "Output.html#sendChannelAftertouch": {
                                              "ref": "Output.html#sendChannelAftertouch",
                                              "tf": 3.8461538461538463
                                            },
                                            "Output.html#sendKeyAftertouch": {
                                              "ref": "Output.html#sendKeyAftertouch",
                                              "tf": 666.6666666666666
                                            },
                                            "OutputChannel.html#sendKeyAftertouch": {
                                              "ref": "OutputChannel.html#sendKeyAftertouch",
                                              "tf": 670
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "r": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "Output.html#sendReset": {
                              "ref": "Output.html#sendReset",
                              "tf": 683.3333333333334
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "t": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "m": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "c": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "d": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "q": {
                                  "docs": {},
                                  "u": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "f": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "m": {
                                                      "docs": {
                                                        "Output.html#sendTimecodeQuarterFrame": {
                                                          "ref": "Output.html#sendTimecodeQuarterFrame",
                                                          "tf": 675
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "u": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "q": {
                              "docs": {},
                              "u": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "t": {
                                      "docs": {
                                        "Output.html#sendTuneRequest": {
                                          "ref": "Output.html#sendTuneRequest",
                                          "tf": 683.3333333333334
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "s": {
                "docs": {
                  "Output.html#sendActiveSensing": {
                    "ref": "Output.html#sendActiveSensing",
                    "tf": 4.545454545454546
                  }
                }
              },
              "t": {
                "docs": {
                  "Output.html#sendActiveSensing": {
                    "ref": "Output.html#sendActiveSensing",
                    "tf": 2.272727272727273
                  }
                }
              }
            },
            "e": {
              "docs": {
                "Output.html#sendControlChange": {
                  "ref": "Output.html#sendControlChange",
                  "tf": 0.2890173410404624
                },
                "OutputChannel.html#sendControlChange": {
                  "ref": "OutputChannel.html#sendControlChange",
                  "tf": 0.2890173410404624
                }
              }
            },
            "l": {
              "docs": {},
              "e": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Output.html#sendSongSelect": {
                        "ref": "Output.html#sendSongSelect",
                        "tf": 3.571428571428571
                      }
                    }
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "v": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  },
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 0.5617977528089888
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "i": {
                "docs": {},
                "t": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "Output.html#setPitchBendRange": {
                          "ref": "Output.html#setPitchBendRange",
                          "tf": 18.45238095238095
                        }
                      }
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "u": {
                "docs": {},
                "r": {
                  "docs": {
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.5714285714285714
                    }
                  }
                }
              }
            }
          },
          "y": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "e": {
                  "docs": {},
                  "m": {
                    "docs": {
                      "Input.html#nrpnEventsEnabled": {
                        "ref": "Input.html#nrpnEventsEnabled",
                        "tf": 1.0869565217391304
                      },
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 1
                      },
                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                        "tf": 1.6853932584269662
                      },
                      "WebMidi.html#sysexEnabled": {
                        "ref": "WebMidi.html#sysexEnabled",
                        "tf": 4.166666666666666
                      },
                      "WebMidi.html#enable": {
                        "ref": "WebMidi.html#enable",
                        "tf": 0.5714285714285714
                      }
                    }
                  }
                }
              },
              "e": {
                "docs": {},
                "x": {
                  "docs": {
                    "Output.html#sendSysex": {
                      "ref": "Output.html#sendSysex",
                      "tf": 2.3333333333333335
                    },
                    "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                      "tf": 1.1235955056179776
                    },
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.8571428571428572
                    }
                  },
                  "e": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "WebMidi.html#sysexEnabled": {
                          "ref": "WebMidi.html#sysexEnabled",
                          "tf": 683.3333333333334
                        },
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.2857142857142857
                        }
                      },
                      "d": {
                        "docs": {
                          "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                            "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                            "tf": 1.1235955056179776
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "t": {
                "docs": {},
                "h": {
                  "docs": {
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.2857142857142857
                    }
                  },
                  "e": {
                    "docs": {},
                    "s": {
                      "docs": {
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.2857142857142857
                        }
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "b": {
                "docs": {},
                "o": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "WebMidi.html#getNoteNumberByName": {
                        "ref": "WebMidi.html#getNoteNumberByName",
                        "tf": 0.5681818181818182
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "o": {
              "docs": {},
              "n": {
                "docs": {
                  "Output.html#clear": {
                    "ref": "Output.html#clear",
                    "tf": 3.8461538461538463
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "g": {
                "docs": {
                  "Output.html#sendContinue": {
                    "ref": "Output.html#sendContinue",
                    "tf": 4.761904761904762
                  },
                  "Output.html#sendSongPosition": {
                    "ref": "Output.html#sendSongPosition",
                    "tf": 5.263157894736842
                  },
                  "Output.html#sendSongSelect": {
                    "ref": "Output.html#sendSongSelect",
                    "tf": 3.571428571428571
                  },
                  "Output.html#sendStart": {
                    "ref": "Output.html#sendStart",
                    "tf": 4.761904761904762
                  }
                },
                "p": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                              "tf": 0.5617977528089888
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "s": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "c": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                                "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                                "tf": 0.5617977528089888
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "f": {
              "docs": {},
              "t": {
                "docs": {},
                "p": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "Output.html#sendControlChange": {
                          "ref": "Output.html#sendControlChange",
                          "tf": 0.2890173410404624
                        },
                        "OutputChannel.html#sendControlChange": {
                          "ref": "OutputChannel.html#sendControlChange",
                          "tf": 0.2890173410404624
                        },
                        "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                          "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                          "tf": 0.4032258064516129
                        }
                      }
                    }
                  }
                },
                "w": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.8571428571428572
                        }
                      }
                    }
                  }
                }
              }
            },
            "u": {
              "docs": {},
              "n": {
                "docs": {},
                "d": {
                  "docs": {
                    "Output.html#setRegisteredParameter": {
                      "ref": "Output.html#setRegisteredParameter",
                      "tf": 0.3184713375796179
                    }
                  },
                  "a": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "c": {
                            "docs": {},
                            "k": {
                              "docs": {},
                              "t": {
                                "docs": {},
                                "i": {
                                  "docs": {},
                                  "m": {
                                    "docs": {
                                      "Output.html#sendControlChange": {
                                        "ref": "Output.html#sendControlChange",
                                        "tf": 0.2890173410404624
                                      },
                                      "OutputChannel.html#sendControlChange": {
                                        "ref": "OutputChannel.html#sendControlChange",
                                        "tf": 0.2890173410404624
                                      },
                                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                        "tf": 0.4032258064516129
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "c": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "l": {
                                "1": {
                                  "0": {
                                    "docs": {
                                      "Output.html#sendControlChange": {
                                        "ref": "Output.html#sendControlChange",
                                        "tf": 0.2890173410404624
                                      },
                                      "OutputChannel.html#sendControlChange": {
                                        "ref": "OutputChannel.html#sendControlChange",
                                        "tf": 0.2890173410404624
                                      },
                                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                        "tf": 0.4032258064516129
                                      }
                                    }
                                  },
                                  "docs": {}
                                },
                                "6": {
                                  "docs": {
                                    "Output.html#sendControlChange": {
                                      "ref": "Output.html#sendControlChange",
                                      "tf": 0.2890173410404624
                                    },
                                    "OutputChannel.html#sendControlChange": {
                                      "ref": "OutputChannel.html#sendControlChange",
                                      "tf": 0.2890173410404624
                                    },
                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                      "tf": 0.4032258064516129
                                    }
                                  }
                                },
                                "7": {
                                  "docs": {
                                    "Output.html#sendControlChange": {
                                      "ref": "Output.html#sendControlChange",
                                      "tf": 0.2890173410404624
                                    },
                                    "OutputChannel.html#sendControlChange": {
                                      "ref": "OutputChannel.html#sendControlChange",
                                      "tf": 0.2890173410404624
                                    },
                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                      "tf": 0.4032258064516129
                                    }
                                  }
                                },
                                "8": {
                                  "docs": {
                                    "Output.html#sendControlChange": {
                                      "ref": "Output.html#sendControlChange",
                                      "tf": 0.2890173410404624
                                    },
                                    "OutputChannel.html#sendControlChange": {
                                      "ref": "OutputChannel.html#sendControlChange",
                                      "tf": 0.2890173410404624
                                    }
                                  },
                                  ":": {
                                    "docs": {},
                                    "`": {
                                      "7": {
                                        "7": {
                                          "docs": {
                                            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                              "tf": 0.4032258064516129
                                            }
                                          }
                                        },
                                        "docs": {}
                                      },
                                      "docs": {}
                                    }
                                  }
                                },
                                "9": {
                                  "docs": {
                                    "Output.html#sendControlChange": {
                                      "ref": "Output.html#sendControlChange",
                                      "tf": 0.2890173410404624
                                    },
                                    "OutputChannel.html#sendControlChange": {
                                      "ref": "OutputChannel.html#sendControlChange",
                                      "tf": 0.2890173410404624
                                    },
                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                      "tf": 0.4032258064516129
                                    }
                                  }
                                },
                                "docs": {}
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "r": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "s": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "m": {
                                      "docs": {
                                        "Output.html#sendControlChange": {
                                          "ref": "Output.html#sendControlChange",
                                          "tf": 0.2890173410404624
                                        },
                                        "OutputChannel.html#sendControlChange": {
                                          "ref": "OutputChannel.html#sendControlChange",
                                          "tf": 0.2890173410404624
                                        },
                                        "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                          "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                          "tf": 0.4032258064516129
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "v": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "i": {
                          "docs": {
                            "Output.html#sendControlChange": {
                              "ref": "Output.html#sendControlChange",
                              "tf": 0.2890173410404624
                            },
                            "OutputChannel.html#sendControlChange": {
                              "ref": "OutputChannel.html#sendControlChange",
                              "tf": 0.2890173410404624
                            },
                            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                              "tf": 0.4032258064516129
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "c": {
            "docs": {},
            "h": {
              "docs": {},
              "e": {
                "docs": {},
                "d": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "Output.html#send": {
                          "ref": "Output.html#send",
                          "tf": 1.282051282051282
                        },
                        "Output.html#sendControlChange": {
                          "ref": "Output.html#sendControlChange",
                          "tf": 0.2890173410404624
                        },
                        "Output.html#sendKeyAftertouch": {
                          "ref": "Output.html#sendKeyAftertouch",
                          "tf": 2.7777777777777777
                        },
                        "Output.html#sendStop": {
                          "ref": "Output.html#sendStop",
                          "tf": 3.571428571428571
                        },
                        "Output.html#setPitchBendRange": {
                          "ref": "Output.html#setPitchBendRange",
                          "tf": 1.7857142857142856
                        },
                        "OutputChannel.html#send": {
                          "ref": "OutputChannel.html#send",
                          "tf": 1.4285714285714286
                        },
                        "OutputChannel.html#sendControlChange": {
                          "ref": "OutputChannel.html#sendControlChange",
                          "tf": 0.2890173410404624
                        },
                        "OutputChannel.html#sendKeyAftertouch": {
                          "ref": "OutputChannel.html#sendKeyAftertouch",
                          "tf": 3.125
                        }
                      }
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "e": {
                "docs": {},
                "n": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "f": {
                        "docs": {
                          "WebMidi.html#getNoteNumberByName": {
                            "ref": "WebMidi.html#getNoteNumberByName",
                            "tf": 0.5681818181818182
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "m": {
              "docs": {},
              "p": {
                "docs": {},
                "l": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "Output.html#send": {
                          "ref": "Output.html#send",
                          "tf": 1.282051282051282
                        },
                        "Output.html#setRegisteredParameter": {
                          "ref": "Output.html#setRegisteredParameter",
                          "tf": 0.3184713375796179
                        },
                        "OutputChannel.html#send": {
                          "ref": "OutputChannel.html#send",
                          "tf": 1.4285714285714286
                        }
                      }
                    }
                  },
                  "i": {
                    "docs": {
                      "Output.html#sendControlChange": {
                        "ref": "Output.html#sendControlChange",
                        "tf": 0.2890173410404624
                      },
                      "OutputChannel.html#sendControlChange": {
                        "ref": "OutputChannel.html#sendControlChange",
                        "tf": 0.2890173410404624
                      },
                      "WebMidi.html": {
                        "ref": "WebMidi.html",
                        "tf": 0.8620689655172413
                      },
                      "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                        "tf": 1.1235955056179776
                      },
                      "WebMidi.html#time": {
                        "ref": "WebMidi.html#time",
                        "tf": 1.5625
                      },
                      "WebMidi.html#guessNoteNumber": {
                        "ref": "WebMidi.html#guessNoteNumber",
                        "tf": 1.25
                      }
                    },
                    "f": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "WebMidi.html": {
                            "ref": "WebMidi.html",
                            "tf": 0.8620689655172413
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "g": {
              "docs": {},
              "n": {
                "docs": {
                  "WebMidi.html#convertToTimestamp": {
                    "ref": "WebMidi.html#convertToTimestamp",
                    "tf": 1.3888888888888888
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "e": {
                "docs": {},
                "n": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "WebMidi.html#sanitizeChannels": {
                        "ref": "WebMidi.html#sanitizeChannels",
                        "tf": 1.0204081632653061
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "g": {
                "docs": {},
                "l": {
                  "docs": {
                    "WebMidi.html#sanitizeChannels": {
                      "ref": "WebMidi.html#sanitizeChannels",
                      "tf": 1.0204081632653061
                    }
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "a": {
              "docs": {},
              "r": {
                "docs": {},
                "p": {
                  "docs": {
                    "WebMidi.html#getNoteNumberByName": {
                      "ref": "WebMidi.html#getNoteNumberByName",
                      "tf": 1.1363636363636365
                    }
                  }
                }
              }
            }
          }
        },
        "n": {
          "docs": {},
          "o": {
            "docs": {},
            "n": {
              "docs": {
                "Input.html#.NRPN_TYPES": {
                  "ref": "Input.html#.NRPN_TYPES",
                  "tf": 6.25
                },
                "Input.html#nrpnEventsEnabled": {
                  "ref": "Input.html#nrpnEventsEnabled",
                  "tf": 1.0869565217391304
                }
              },
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "g": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "d": {
                                  "docs": {},
                                  "p": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "m": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "t": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    "c": {
                                                      "docs": {},
                                                      "o": {
                                                        "docs": {},
                                                        "a": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "s": {
                                                              "docs": {
                                                                "Output.html#sendControlChange": {
                                                                  "ref": "Output.html#sendControlChange",
                                                                  "tf": 0.2890173410404624
                                                                },
                                                                "OutputChannel.html#sendControlChange": {
                                                                  "ref": "OutputChannel.html#sendControlChange",
                                                                  "tf": 0.2890173410404624
                                                                },
                                                                "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                                  "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                                  "tf": 0.4032258064516129
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    },
                                                    "f": {
                                                      "docs": {},
                                                      "i": {
                                                        "docs": {},
                                                        "n": {
                                                          "docs": {
                                                            "Output.html#sendControlChange": {
                                                              "ref": "Output.html#sendControlChange",
                                                              "tf": 0.2890173410404624
                                                            },
                                                            "OutputChannel.html#sendControlChange": {
                                                              "ref": "OutputChannel.html#sendControlChange",
                                                              "tf": 0.2890173410404624
                                                            },
                                                            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                              "tf": 0.4032258064516129
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "e": {
                "docs": {
                  "WebMidi.html#sanitizeChannels": {
                    "ref": "WebMidi.html#sanitizeChannels",
                    "tf": 2.0408163265306123
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "e": {
                "docs": {
                  "Output.html#sendClock": {
                    "ref": "Output.html#sendClock",
                    "tf": 3.8461538461538463
                  },
                  "Output.html#sendControlChange": {
                    "ref": "Output.html#sendControlChange",
                    "tf": 0.2890173410404624
                  },
                  "Output.html#sendKeyAftertouch": {
                    "ref": "Output.html#sendKeyAftertouch",
                    "tf": 16.666666666666664
                  },
                  "Output.html#sendSongPosition": {
                    "ref": "Output.html#sendSongPosition",
                    "tf": 2.631578947368421
                  },
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  },
                  "Output.html#sendTimecodeQuarterFrame": {
                    "ref": "Output.html#sendTimecodeQuarterFrame",
                    "tf": 2.5
                  },
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  },
                  "OutputChannel.html#sendControlChange": {
                    "ref": "OutputChannel.html#sendControlChange",
                    "tf": 0.2890173410404624
                  },
                  "OutputChannel.html#sendKeyAftertouch": {
                    "ref": "OutputChannel.html#sendKeyAftertouch",
                    "tf": 20
                  },
                  "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                    "tf": 3.571428571428571
                  },
                  "WebMidi.html#NOTES": {
                    "ref": "WebMidi.html#NOTES",
                    "tf": 695.8333333333334
                  },
                  "WebMidi.html#octaveOffset": {
                    "ref": "WebMidi.html#octaveOffset",
                    "tf": 4.054054054054054
                  },
                  "WebMidi.html#supported": {
                    "ref": "WebMidi.html#supported",
                    "tf": 1.7241379310344827
                  },
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.2857142857142857
                  },
                  "WebMidi.html#getInputById": {
                    "ref": "WebMidi.html#getInputById",
                    "tf": 1.4705882352941175
                  },
                  "WebMidi.html#getInputByName": {
                    "ref": "WebMidi.html#getInputByName",
                    "tf": 2
                  },
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 4.545454545454546
                  },
                  "WebMidi.html#getOctave": {
                    "ref": "WebMidi.html#getOctave",
                    "tf": 3.8461538461538463
                  },
                  "WebMidi.html#getOutputById": {
                    "ref": "WebMidi.html#getOutputById",
                    "tf": 1.4705882352941175
                  },
                  "WebMidi.html#getOutputByName": {
                    "ref": "WebMidi.html#getOutputByName",
                    "tf": 2
                  },
                  "WebMidi.html#guessNoteNumber": {
                    "ref": "WebMidi.html#guessNoteNumber",
                    "tf": 3.75
                  },
                  "WebMidi.html#sanitizeChannels": {
                    "ref": "WebMidi.html#sanitizeChannels",
                    "tf": 1.0204081632653061
                  }
                },
                "o": {
                  "docs": {},
                  "f": {
                    "docs": {},
                    "f": {
                      "docs": {
                        "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                          "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                          "tf": 1.4285714285714286
                        }
                      }
                    }
                  },
                  "n": {
                    "docs": {
                      "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                        "tf": 1.4285714285714286
                      }
                    }
                  }
                }
              },
              "a": {
                "docs": {},
                "t": {
                  "docs": {
                    "Output.html#sendSysex": {
                      "ref": "Output.html#sendSysex",
                      "tf": 0.33333333333333337
                    },
                    "WebMidi.html#getNoteNumberByName": {
                      "ref": "WebMidi.html#getNoteNumberByName",
                      "tf": 0.5681818181818182
                    }
                  }
                }
              }
            },
            "w": {
              "docs": {
                "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                  "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                  "tf": 3.571428571428571
                }
              }
            }
          },
          "r": {
            "docs": {},
            "p": {
              "docs": {},
              "n": {
                "docs": {
                  "Input.html#.NRPN_TYPES": {
                    "ref": "Input.html#.NRPN_TYPES",
                    "tf": 6.25
                  },
                  "Input.html#nrpnEventsEnabled": {
                    "ref": "Input.html#nrpnEventsEnabled",
                    "tf": 2.1739130434782608
                  },
                  "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                    "tf": 1.4285714285714286
                  },
                  "WebMidi.html#MIDI_NRPN_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                    "tf": 2
                  }
                },
                "_": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "y": {
                      "docs": {},
                      "p": {
                        "docs": {},
                        "e": {
                          "docs": {
                            "Input.html#.NRPN_TYPES": {
                              "ref": "Input.html#.NRPN_TYPES",
                              "tf": 675
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "e": {
                  "docs": {},
                  "v": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "n": {
                                "docs": {
                                  "Input.html#nrpnEventsEnabled": {
                                    "ref": "Input.html#nrpnEventsEnabled",
                                    "tf": 700
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "m": {
              "docs": {},
              "b": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "Input.html#.NRPN_TYPES": {
                        "ref": "Input.html#.NRPN_TYPES",
                        "tf": 6.25
                      },
                      "Input.html#nrpnEventsEnabled": {
                        "ref": "Input.html#nrpnEventsEnabled",
                        "tf": 1.0869565217391304
                      },
                      "Input.html#getCcNameByNumber": {
                        "ref": "Input.html#getCcNameByNumber",
                        "tf": 37.179487179487175
                      },
                      "Input.html#getChannelModeByNumber": {
                        "ref": "Input.html#getChannelModeByNumber",
                        "tf": 37.49999999999999
                      },
                      "InputChannel.html#number": {
                        "ref": "InputChannel.html#number",
                        "tf": 762.5
                      },
                      "Output.html#sendControlChange": {
                        "ref": "Output.html#sendControlChange",
                        "tf": 0.2890173410404624
                      },
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 0.33333333333333337
                      },
                      "Output.html#setRegisteredParameter": {
                        "ref": "Output.html#setRegisteredParameter",
                        "tf": 0.3184713375796179
                      },
                      "OutputChannel.html#number": {
                        "ref": "OutputChannel.html#number",
                        "tf": 762.5
                      },
                      "OutputChannel.html#sendControlChange": {
                        "ref": "OutputChannel.html#sendControlChange",
                        "tf": 0.2890173410404624
                      },
                      "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                        "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                        "tf": 0.78125
                      },
                      "WebMidi.html#octaveOffset": {
                        "ref": "WebMidi.html#octaveOffset",
                        "tf": 54.054054054054056
                      },
                      "WebMidi.html#time": {
                        "ref": "WebMidi.html#time",
                        "tf": 3.125
                      },
                      "WebMidi.html#convertToTimestamp": {
                        "ref": "WebMidi.html#convertToTimestamp",
                        "tf": 2.7777777777777777
                      },
                      "WebMidi.html#getNoteNumberByName": {
                        "ref": "WebMidi.html#getNoteNumberByName",
                        "tf": 3.977272727272727
                      },
                      "WebMidi.html#getOctave": {
                        "ref": "WebMidi.html#getOctave",
                        "tf": 37.179487179487175
                      },
                      "WebMidi.html#guessNoteNumber": {
                        "ref": "WebMidi.html#guessNoteNumber",
                        "tf": 1.25
                      },
                      "WebMidi.html#sanitizeChannels": {
                        "ref": "WebMidi.html#sanitizeChannels",
                        "tf": 1.0204081632653061
                      }
                    },
                    "&": {
                      "docs": {},
                      "g": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                              "tf": 25
                            },
                            "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                              "tf": 25
                            },
                            "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                              "tf": 25
                            },
                            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                              "tf": 25
                            },
                            "WebMidi.html#MIDI_NRPN_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                              "tf": 25
                            },
                            "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                              "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                              "tf": 25
                            },
                            "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                              "tf": 25
                            }
                          }
                        }
                      }
                    },
                    "|": {
                      "docs": {},
                      "f": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "s": {
                              "docs": {
                                "WebMidi.html#getNoteNumberByName": {
                                  "ref": "WebMidi.html#getNoteNumberByName",
                                  "tf": 33.33333333333333
                                },
                                "WebMidi.html#getOctave": {
                                  "ref": "WebMidi.html#getOctave",
                                  "tf": 33.33333333333333
                                },
                                "WebMidi.html#guessNoteNumber": {
                                  "ref": "WebMidi.html#guessNoteNumber",
                                  "tf": 33.33333333333333
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "Output.html#sendControlChange": {
                      "ref": "Output.html#sendControlChange",
                      "tf": 0.2890173410404624
                    },
                    "OutputChannel.html#sendControlChange": {
                      "ref": "OutputChannel.html#sendControlChange",
                      "tf": 0.2890173410404624
                    },
                    "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                      "tf": 3.571428571428571
                    },
                    "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                      "tf": 2.1739130434782608
                    },
                    "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                      "tf": 1.4285714285714286
                    },
                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                      "tf": 0.4032258064516129
                    },
                    "WebMidi.html#MIDI_NRPN_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                      "tf": 2
                    },
                    "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                      "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                      "tf": 0.78125
                    },
                    "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                      "tf": 0.5617977528089888
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "l": {
                "docs": {},
                "a": {
                  "docs": {},
                  "b": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "&": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "WebMidi.html#interface": {
                                  "ref": "WebMidi.html#interface",
                                  "tf": 25
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "c": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "v": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "p": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "a": {
                                    "docs": {},
                                    "m": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "t": {
                                          "docs": {
                                            "WebMidi.html#MIDI_NRPN_MESSAGES": {
                                              "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                                              "tf": 2
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "m": {
              "docs": {},
              "e": {
                "docs": {
                  "Input.html#manufacturer": {
                    "ref": "Input.html#manufacturer",
                    "tf": 7.142857142857142
                  },
                  "Input.html#name": {
                    "ref": "Input.html#name",
                    "tf": 716.6666666666666
                  },
                  "Input.html#getCcNameByNumber": {
                    "ref": "Input.html#getCcNameByNumber",
                    "tf": 3.8461538461538463
                  },
                  "Input.html#getChannelModeByNumber": {
                    "ref": "Input.html#getChannelModeByNumber",
                    "tf": 4.166666666666666
                  },
                  "Output.html#manufacturer": {
                    "ref": "Output.html#manufacturer",
                    "tf": 7.142857142857142
                  },
                  "Output.html#name": {
                    "ref": "Output.html#name",
                    "tf": 700
                  },
                  "Output.html#sendControlChange": {
                    "ref": "Output.html#sendControlChange",
                    "tf": 0.8670520231213872
                  },
                  "OutputChannel.html#sendControlChange": {
                    "ref": "OutputChannel.html#sendControlChange",
                    "tf": 0.8670520231213872
                  },
                  "WebMidi.html#NOTES": {
                    "ref": "WebMidi.html#NOTES",
                    "tf": 12.5
                  },
                  "WebMidi.html#getInputByName": {
                    "ref": "WebMidi.html#getInputByName",
                    "tf": 39.33333333333333
                  },
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 36.742424242424235
                  },
                  "WebMidi.html#getOutputByName": {
                    "ref": "WebMidi.html#getOutputByName",
                    "tf": 39.33333333333333
                  },
                  "WebMidi.html#guessNoteNumber": {
                    "ref": "WebMidi.html#guessNoteNumber",
                    "tf": 1.25
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "i": {
                "docs": {},
                "v": {
                  "docs": {
                    "Output.html#sendSysex": {
                      "ref": "Output.html#sendSysex",
                      "tf": 0.33333333333333337
                    }
                  }
                }
              }
            },
            "v": {
              "docs": {},
              "i": {
                "docs": {},
                "g": {
                  "docs": {
                    "WebMidi.html#convertToTimestamp": {
                      "ref": "WebMidi.html#convertToTimestamp",
                      "tf": 1.3888888888888888
                    }
                  },
                  "a": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          ".": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "q": {
                                  "docs": {},
                                  "u": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "m": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "d": {
                                                "docs": {},
                                                "i": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "c": {
                                                      "docs": {},
                                                      "c": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "s": {
                                                            "docs": {},
                                                            "s": {
                                                              "docs": {
                                                                "WebMidi.html#supported": {
                                                                  "ref": "WebMidi.html#supported",
                                                                  "tf": 1.7241379310344827
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "e": {
              "docs": {},
              "d": {
                "docs": {
                  "Output.html#sendControlChange": {
                    "ref": "Output.html#sendControlChange",
                    "tf": 0.2890173410404624
                  },
                  "OutputChannel.html#sendControlChange": {
                    "ref": "OutputChannel.html#sendControlChange",
                    "tf": 0.2890173410404624
                  },
                  "WebMidi.html": {
                    "ref": "WebMidi.html",
                    "tf": 0.8620689655172413
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "e": {
                "docs": {},
                "s": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "i": {
                          "docs": {
                            "Output.html#sendSysex": {
                              "ref": "Output.html#sendSysex",
                              "tf": 0.33333333333333337
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "w": {
              "docs": {
                "WebMidi.html": {
                  "ref": "WebMidi.html",
                  "tf": 0.8620689655172413
                }
              }
            },
            "v": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                      "tf": 0.5617977528089888
                    }
                  }
                }
              }
            }
          }
        },
        "v": {
          "3": {
            "docs": {},
            ".": {
              "0": {
                "docs": {
                  "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                    "tf": 3.571428571428571
                  }
                }
              },
              "docs": {},
              "x": {
                "docs": {
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 0.5681818181818182
                  },
                  "WebMidi.html#getOctave": {
                    "ref": "WebMidi.html#getOctave",
                    "tf": 1.282051282051282
                  },
                  "WebMidi.html#guessNoteNumber": {
                    "ref": "WebMidi.html#guessNoteNumber",
                    "tf": 1.25
                  }
                }
              }
            }
          },
          "7": {
            "7": {
              "docs": {
                "WebMidi.html#enable": {
                  "ref": "WebMidi.html#enable",
                  "tf": 0.2857142857142857
                }
              }
            },
            "docs": {}
          },
          "docs": {},
          "a": {
            "docs": {},
            "l": {
              "docs": {},
              "i": {
                "docs": {},
                "d": {
                  "docs": {
                    "Input.html#.NRPN_TYPES": {
                      "ref": "Input.html#.NRPN_TYPES",
                      "tf": 6.25
                    },
                    "Input.html#nrpnEventsEnabled": {
                      "ref": "Input.html#nrpnEventsEnabled",
                      "tf": 1.0869565217391304
                    },
                    "WebMidi.html#MIDI_INTERFACE_EVENTS": {
                      "ref": "WebMidi.html#MIDI_INTERFACE_EVENTS",
                      "tf": 8.333333333333332
                    },
                    "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                      "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                      "tf": 0.5617977528089888
                    },
                    "WebMidi.html#getNoteNumberByName": {
                      "ref": "WebMidi.html#getNoteNumberByName",
                      "tf": 0.5681818181818182
                    },
                    "WebMidi.html#getOctave": {
                      "ref": "WebMidi.html#getOctave",
                      "tf": 1.282051282051282
                    },
                    "WebMidi.html#guessNoteNumber": {
                      "ref": "WebMidi.html#guessNoteNumber",
                      "tf": 1.25
                    },
                    "WebMidi.html#sanitizeChannels": {
                      "ref": "WebMidi.html#sanitizeChannels",
                      "tf": 1.0204081632653061
                    }
                  }
                }
              },
              "u": {
                "docs": {
                  "Output.html#sendControlChange": {
                    "ref": "Output.html#sendControlChange",
                    "tf": 16.666666666666664
                  },
                  "Output.html#sendSongPosition": {
                    "ref": "Output.html#sendSongPosition",
                    "tf": 27.63157894736842
                  },
                  "Output.html#sendSongSelect": {
                    "ref": "Output.html#sendSongSelect",
                    "tf": 25
                  },
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  },
                  "Output.html#sendTimecodeQuarterFrame": {
                    "ref": "Output.html#sendTimecodeQuarterFrame",
                    "tf": 25
                  },
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.6369426751592357
                  },
                  "OutputChannel.html#sendControlChange": {
                    "ref": "OutputChannel.html#sendControlChange",
                    "tf": 20
                  },
                  "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                    "tf": 3.571428571428571
                  },
                  "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
                    "tf": 2.1739130434782608
                  },
                  "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                    "tf": 1.4285714285714286
                  },
                  "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                    "tf": 0.4032258064516129
                  },
                  "WebMidi.html#MIDI_NRPN_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                    "tf": 2
                  },
                  "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
                    "ref": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
                    "tf": 0.78125
                  },
                  "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                    "tf": 1.1235955056179776
                  },
                  "WebMidi.html#convertToTimestamp": {
                    "ref": "WebMidi.html#convertToTimestamp",
                    "tf": 5.555555555555555
                  },
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 1.1363636363636365
                  },
                  "WebMidi.html#getOctave": {
                    "ref": "WebMidi.html#getOctave",
                    "tf": 2.564102564102564
                  },
                  "WebMidi.html#sanitizeChannels": {
                    "ref": "WebMidi.html#sanitizeChannels",
                    "tf": 2.0408163265306123
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "i": {
                "docs": {},
                "o": {
                  "docs": {},
                  "u": {
                    "docs": {
                      "WebMidi.html#time": {
                        "ref": "WebMidi.html#time",
                        "tf": 1.5625
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "e": {
              "docs": {},
              "w": {
                "docs": {
                  "Output.html#sendControlChange": {
                    "ref": "Output.html#sendControlChange",
                    "tf": 0.2890173410404624
                  },
                  "OutputChannel.html#sendControlChange": {
                    "ref": "OutputChannel.html#sendControlChange",
                    "tf": 0.2890173410404624
                  }
                }
              }
            },
            "a": {
              "docs": {
                "WebMidi.html#sysexEnabled": {
                  "ref": "WebMidi.html#sysexEnabled",
                  "tf": 4.166666666666666
                }
              }
            }
          },
          "o": {
            "docs": {},
            "l": {
              "docs": {},
              "u": {
                "docs": {},
                "m": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "s": {
                              "docs": {
                                "Output.html#sendControlChange": {
                                  "ref": "Output.html#sendControlChange",
                                  "tf": 0.2890173410404624
                                },
                                "OutputChannel.html#sendControlChange": {
                                  "ref": "OutputChannel.html#sendControlChange",
                                  "tf": 0.2890173410404624
                                },
                                "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                  "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                  "tf": 0.4032258064516129
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "f": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "n": {
                          "docs": {
                            "Output.html#sendControlChange": {
                              "ref": "Output.html#sendControlChange",
                              "tf": 0.2890173410404624
                            },
                            "OutputChannel.html#sendControlChange": {
                              "ref": "OutputChannel.html#sendControlChange",
                              "tf": 0.2890173410404624
                            },
                            "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                              "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                              "tf": 0.4032258064516129
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "c": {
                "docs": {
                  "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                    "tf": 3.571428571428571
                  },
                  "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                    "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                    "tf": 1.4285714285714286
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "r": {
              "docs": {},
              "s": {
                "docs": {},
                "i": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "Output.html#sendSysex": {
                          "ref": "Output.html#sendSysex",
                          "tf": 0.33333333333333337
                        },
                        "WebMidi.html": {
                          "ref": "WebMidi.html",
                          "tf": 1.7241379310344827
                        }
                      }
                    }
                  }
                }
              },
              "i": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  }
                }
              }
            }
          }
        },
        "b": {
          "docs": {
            "WebMidi.html#getNoteNumberByName": {
              "ref": "WebMidi.html#getNoteNumberByName",
              "tf": 0.5681818181818182
            }
          },
          "o": {
            "docs": {},
            "o": {
              "docs": {},
              "l": {
                "docs": {},
                "e": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "Input.html#nrpnEventsEnabled": {
                          "ref": "Input.html#nrpnEventsEnabled",
                          "tf": 50
                        },
                        "WebMidi.html#enabled": {
                          "ref": "WebMidi.html#enabled",
                          "tf": 33.33333333333333
                        },
                        "WebMidi.html#supported": {
                          "ref": "WebMidi.html#supported",
                          "tf": 33.33333333333333
                        },
                        "WebMidi.html#sysexEnabled": {
                          "ref": "WebMidi.html#sysexEnabled",
                          "tf": 33.33333333333333
                        }
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "h": {
                "docs": {
                  "Output.html#setPitchBendRange": {
                    "ref": "Output.html#setPitchBendRange",
                    "tf": 1.7857142857142856
                  },
                  "WebMidi.html#octaveOffset": {
                    "ref": "WebMidi.html#octaveOffset",
                    "tf": 1.3513513513513513
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "f": {
              "docs": {},
              "f": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "Input.html#nrpnEventsEnabled": {
                        "ref": "Input.html#nrpnEventsEnabled",
                        "tf": 1.0869565217391304
                      }
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "l": {
                "docs": {},
                "t": {
                  "docs": {
                    "WebMidi.html#supported": {
                      "ref": "WebMidi.html#supported",
                      "tf": 1.7241379310344827
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {
              "Output.html#sendTimecodeQuarterFrame": {
                "ref": "Output.html#sendTimecodeQuarterFrame",
                "tf": 2.5
              },
              "WebMidi.html#time": {
                "ref": "WebMidi.html#time",
                "tf": 1.5625
              },
              "WebMidi.html#getOctave": {
                "ref": "WebMidi.html#getOctave",
                "tf": 1.282051282051282
              },
              "WebMidi.html#sanitizeChannels": {
                "ref": "WebMidi.html#sanitizeChannels",
                "tf": 2.0408163265306123
              }
            },
            "l": {
              "docs": {},
              "o": {
                "docs": {},
                "n": {
                  "docs": {},
                  "g": {
                    "docs": {
                      "InputChannel.html#output": {
                        "ref": "InputChannel.html#output",
                        "tf": 16.666666666666664
                      },
                      "OutputChannel.html#output": {
                        "ref": "OutputChannel.html#output",
                        "tf": 16.666666666666664
                      }
                    }
                  }
                },
                "w": {
                  "docs": {
                    "Output.html#sendSysex": {
                      "ref": "Output.html#sendSysex",
                      "tf": 0.33333333333333337
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "t": {
                "docs": {
                  "Output.html#sendSongPosition": {
                    "ref": "Output.html#sendSongPosition",
                    "tf": 2.631578947368421
                  },
                  "Output.html#sendStart": {
                    "ref": "Output.html#sendStart",
                    "tf": 2.380952380952381
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "w": {
                "docs": {},
                "e": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "Output.html#sendSongPosition": {
                          "ref": "Output.html#sendSongPosition",
                          "tf": 2.631578947368421
                        },
                        "WebMidi.html#guessNoteNumber": {
                          "ref": "WebMidi.html#guessNoteNumber",
                          "tf": 1.25
                        },
                        "WebMidi.html#sanitizeChannels": {
                          "ref": "WebMidi.html#sanitizeChannels",
                          "tf": 1.0204081632653061
                        }
                      }
                    }
                  }
                }
              }
            },
            "w": {
              "docs": {},
              "a": {
                "docs": {},
                "r": {
                  "docs": {
                    "Output.html#sendSongSelect": {
                      "ref": "Output.html#sendSongSelect",
                      "tf": 3.571428571428571
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "d": {
                "docs": {
                  "Output.html#setPitchBendRange": {
                    "ref": "Output.html#setPitchBendRange",
                    "tf": 3.571428571428571
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "o": {
              "docs": {},
              "w": {
                "docs": {},
                "s": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "Output.html#clear": {
                          "ref": "Output.html#clear",
                          "tf": 3.8461538461538463
                        },
                        "Output.html#sendSysex": {
                          "ref": "Output.html#sendSysex",
                          "tf": 0.33333333333333337
                        },
                        "WebMidi.html#time": {
                          "ref": "WebMidi.html#time",
                          "tf": 1.5625
                        },
                        "WebMidi.html#enable": {
                          "ref": "WebMidi.html#enable",
                          "tf": 0.2857142857142857
                        }
                      }
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "a": {
                "docs": {},
                "t": {
                  "docs": {},
                  "h": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "l": {
                                  "docs": {},
                                  "l": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "c": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "a": {
                                              "docs": {},
                                              "r": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {
                                                    "Output.html#sendControlChange": {
                                                      "ref": "Output.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "OutputChannel.html#sendControlChange": {
                                                      "ref": "OutputChannel.html#sendControlChange",
                                                      "tf": 0.2890173410404624
                                                    },
                                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                      "tf": 0.4032258064516129
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "f": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "n": {
                                              "docs": {
                                                "Output.html#sendControlChange": {
                                                  "ref": "Output.html#sendControlChange",
                                                  "tf": 0.2890173410404624
                                                },
                                                "OutputChannel.html#sendControlChange": {
                                                  "ref": "OutputChannel.html#sendControlChange",
                                                  "tf": 0.2890173410404624
                                                },
                                                "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                                  "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                                  "tf": 0.4032258064516129
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "g": {
                "docs": {},
                "h": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "Output.html#sendControlChange": {
                        "ref": "Output.html#sendControlChange",
                        "tf": 0.2890173410404624
                      },
                      "OutputChannel.html#sendControlChange": {
                        "ref": "OutputChannel.html#sendControlChange",
                        "tf": 0.2890173410404624
                      },
                      "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                        "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                        "tf": 0.4032258064516129
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "l": {
              "docs": {},
              "a": {
                "docs": {},
                "n": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "c": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "s": {
                                "docs": {
                                  "Output.html#sendControlChange": {
                                    "ref": "Output.html#sendControlChange",
                                    "tf": 0.2890173410404624
                                  },
                                  "OutputChannel.html#sendControlChange": {
                                    "ref": "OutputChannel.html#sendControlChange",
                                    "tf": 0.2890173410404624
                                  },
                                  "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                    "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                    "tf": 0.4032258064516129
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "f": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "n": {
                            "docs": {
                              "Output.html#sendControlChange": {
                                "ref": "Output.html#sendControlChange",
                                "tf": 0.2890173410404624
                              },
                              "OutputChannel.html#sendControlChange": {
                                "ref": "OutputChannel.html#sendControlChange",
                                "tf": 0.2890173410404624
                              },
                              "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                "tf": 0.4032258064516129
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "k": {
                "docs": {
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.6369426751592357
                  }
                },
                "s": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "c": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "c": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "a": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "s": {
                                      "docs": {
                                        "Output.html#sendControlChange": {
                                          "ref": "Output.html#sendControlChange",
                                          "tf": 0.2890173410404624
                                        },
                                        "OutputChannel.html#sendControlChange": {
                                          "ref": "OutputChannel.html#sendControlChange",
                                          "tf": 0.2890173410404624
                                        },
                                        "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                          "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                          "tf": 0.4032258064516129
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "f": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "n": {
                                  "docs": {
                                    "Output.html#sendControlChange": {
                                      "ref": "Output.html#sendControlChange",
                                      "tf": 0.2890173410404624
                                    },
                                    "OutputChannel.html#sendControlChange": {
                                      "ref": "OutputChannel.html#sendControlChange",
                                      "tf": 0.2890173410404624
                                    },
                                    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
                                      "ref": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
                                      "tf": 0.4032258064516129
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "i": {
                "docs": {},
                "c": {
                  "docs": {
                    "WebMidi.html": {
                      "ref": "WebMidi.html",
                      "tf": 0.8620689655172413
                    }
                  }
                }
              },
              "e": {
                "docs": {
                  "WebMidi.html#getOctave": {
                    "ref": "WebMidi.html#getOctave",
                    "tf": 1.282051282051282
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "n": {
              "docs": {},
              "a": {
                "docs": {},
                "r": {
                  "docs": {},
                  "i": {
                    "docs": {
                      "Output.html#sendSysex": {
                        "ref": "Output.html#sendSysex",
                        "tf": 0.33333333333333337
                      }
                    }
                  }
                }
              }
            }
          },
          "y": {
            "docs": {},
            "t": {
              "docs": {},
              "e": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 1.3333333333333335
                  },
                  "Output.html#setRegisteredParameter": {
                    "ref": "Output.html#setRegisteredParameter",
                    "tf": 0.3184713375796179
                  }
                }
              }
            }
          },
          "#": {
            "docs": {},
            "#": {
              "6": {
                "docs": {
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 0.5681818181818182
                  }
                }
              },
              "docs": {}
            }
          },
          "b": {
            "docs": {
              "WebMidi.html#getNoteNumberByName": {
                "ref": "WebMidi.html#getNoteNumberByName",
                "tf": 0.5681818181818182
              }
            }
          }
        },
        "u": {
          "docs": {},
          "s": {
            "docs": {
              "Output.html#close": {
                "ref": "Output.html#close",
                "tf": 6.25
              },
              "Output.html#send": {
                "ref": "Output.html#send",
                "tf": 2.564102564102564
              },
              "Output.html#sendChannelAftertouch": {
                "ref": "Output.html#sendChannelAftertouch",
                "tf": 3.8461538461538463
              },
              "Output.html#sendContinue": {
                "ref": "Output.html#sendContinue",
                "tf": 2.380952380952381
              },
              "Output.html#sendControlChange": {
                "ref": "Output.html#sendControlChange",
                "tf": 0.8670520231213872
              },
              "Output.html#sendKeyAftertouch": {
                "ref": "Output.html#sendKeyAftertouch",
                "tf": 2.7777777777777777
              },
              "Output.html#sendStart": {
                "ref": "Output.html#sendStart",
                "tf": 2.380952380952381
              },
              "Output.html#sendSysex": {
                "ref": "Output.html#sendSysex",
                "tf": 1.6666666666666667
              },
              "Output.html#setPitchBendRange": {
                "ref": "Output.html#setPitchBendRange",
                "tf": 1.7857142857142856
              },
              "Output.html#setRegisteredParameter": {
                "ref": "Output.html#setRegisteredParameter",
                "tf": 0.6369426751592357
              },
              "OutputChannel.html#send": {
                "ref": "OutputChannel.html#send",
                "tf": 2.857142857142857
              },
              "OutputChannel.html#sendControlChange": {
                "ref": "OutputChannel.html#sendControlChange",
                "tf": 0.8670520231213872
              },
              "OutputChannel.html#sendKeyAftertouch": {
                "ref": "OutputChannel.html#sendKeyAftertouch",
                "tf": 3.125
              },
              "WebMidi.html": {
                "ref": "WebMidi.html",
                "tf": 3.4482758620689653
              },
              "WebMidi.html#interface": {
                "ref": "WebMidi.html#interface",
                "tf": 8.333333333333332
              },
              "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
                "ref": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
                "tf": 3.571428571428571
              },
              "WebMidi.html#MIDI_NRPN_MESSAGES": {
                "ref": "WebMidi.html#MIDI_NRPN_MESSAGES",
                "tf": 2
              },
              "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                "tf": 0.5617977528089888
              },
              "WebMidi.html#enable": {
                "ref": "WebMidi.html#enable",
                "tf": 1.1428571428571428
              },
              "WebMidi.html#getInputById": {
                "ref": "WebMidi.html#getInputById",
                "tf": 1.4705882352941175
              },
              "WebMidi.html#getOctave": {
                "ref": "WebMidi.html#getOctave",
                "tf": 1.282051282051282
              },
              "WebMidi.html#getOutputById": {
                "ref": "WebMidi.html#getOutputById",
                "tf": 1.4705882352941175
              }
            },
            "a": {
              "docs": {},
              "g": {
                "docs": {
                  "Input.html#open": {
                    "ref": "Input.html#open",
                    "tf": 16.666666666666664
                  },
                  "Output.html#open": {
                    "ref": "Output.html#open",
                    "tf": 16.666666666666664
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "r": {
                "docs": {
                  "Output.html#sendSongSelect": {
                    "ref": "Output.html#sendSongSelect",
                    "tf": 3.571428571428571
                  },
                  "WebMidi.html#enable": {
                    "ref": "WebMidi.html#enable",
                    "tf": 0.5714285714285714
                  }
                }
              }
            },
            "u": {
              "docs": {},
              "a": {
                "docs": {},
                "l": {
                  "docs": {
                    "WebMidi.html#guessNoteNumber": {
                      "ref": "WebMidi.html#guessNoteNumber",
                      "tf": 1.25
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "l": {
              "docs": {},
              "e": {
                "docs": {},
                "s": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "Output.html#send": {
                        "ref": "Output.html#send",
                        "tf": 1.282051282051282
                      },
                      "Output.html#setRegisteredParameter": {
                        "ref": "Output.html#setRegisteredParameter",
                        "tf": 0.3184713375796179
                      },
                      "OutputChannel.html#send": {
                        "ref": "OutputChannel.html#send",
                        "tf": 1.4285714285714286
                      },
                      "WebMidi.html#interface": {
                        "ref": "WebMidi.html#interface",
                        "tf": 4.166666666666666
                      }
                    }
                  }
                }
              },
              "i": {
                "docs": {},
                "n": {
                  "docs": {},
                  "k": {
                    "docs": {
                      "WebMidi.html#disable": {
                        "ref": "WebMidi.html#disable",
                        "tf": 2.272727272727273
                      }
                    }
                  }
                }
              }
            },
            "d": {
              "docs": {},
              "e": {
                "docs": {},
                "f": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "WebMidi.html#getOctave": {
                          "ref": "WebMidi.html#getOctave",
                          "tf": 1.282051282051282
                        },
                        "WebMidi.html#sanitizeChannels": {
                          "ref": "WebMidi.html#sanitizeChannels",
                          "tf": 1.0204081632653061
                        }
                      },
                      "e": {
                        "docs": {},
                        "d": {
                          "docs": {},
                          "/": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "v": {
                                        "docs": {
                                          "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                                            "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                                            "tf": 0.5617977528089888
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "r": {
                  "docs": {
                    "WebMidi.html#enable": {
                      "ref": "WebMidi.html#enable",
                      "tf": 0.2857142857142857
                    }
                  }
                }
              }
            },
            "k": {
              "docs": {},
              "n": {
                "docs": {},
                "o": {
                  "docs": {},
                  "w": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "y": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "m": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "s": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "g": {
                                              "docs": {
                                                "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
                                                  "ref": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
                                                  "tf": 0.5617977528089888
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "p": {
            "docs": {
              "Output.html#sendTimecodeQuarterFrame": {
                "ref": "Output.html#sendTimecodeQuarterFrame",
                "tf": 2.5
              },
              "Output.html#setRegisteredParameter": {
                "ref": "Output.html#setRegisteredParameter",
                "tf": 0.3184713375796179
              }
            }
          }
        },
        "q": {
          "docs": {},
          "u": {
            "docs": {},
            "e": {
              "docs": {},
              "u": {
                "docs": {
                  "Output.html#clear": {
                    "ref": "Output.html#clear",
                    "tf": 3.8461538461538463
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "r": {
                "docs": {},
                "t": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "Output.html#sendClock": {
                          "ref": "Output.html#sendClock",
                          "tf": 3.8461538461538463
                        },
                        "Output.html#sendTimecodeQuarterFrame": {
                          "ref": "Output.html#sendTimecodeQuarterFrame",
                          "tf": 2.5
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "k": {
          "docs": {},
          "e": {
            "docs": {},
            "y": {
              "docs": {
                "Output.html#sendChannelAftertouch": {
                  "ref": "Output.html#sendChannelAftertouch",
                  "tf": 3.8461538461538463
                },
                "Output.html#sendKeyAftertouch": {
                  "ref": "Output.html#sendKeyAftertouch",
                  "tf": 5.555555555555555
                },
                "OutputChannel.html#sendKeyAftertouch": {
                  "ref": "OutputChannel.html#sendKeyAftertouch",
                  "tf": 6.25
                }
              },
              "a": {
                "docs": {},
                "f": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "o": {
                            "docs": {},
                            "u": {
                              "docs": {},
                              "c": {
                                "docs": {},
                                "h": {
                                  "docs": {
                                    "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
                                      "ref": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
                                      "tf": 1.4285714285714286
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "p": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.33333333333333337
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "r": {
              "docs": {},
              "g": {
                "docs": {
                  "Output.html#sendSysex": {
                    "ref": "Output.html#sendSysex",
                    "tf": 0.6666666666666667
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "o": {
              "docs": {},
              "w": {
                "docs": {
                  "WebMidi.html#interface": {
                    "ref": "WebMidi.html#interface",
                    "tf": 4.166666666666666
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "n": {
              "docs": {},
              "d": {
                "docs": {
                  "WebMidi.html#getInputById": {
                    "ref": "WebMidi.html#getInputById",
                    "tf": 1.4705882352941175
                  },
                  "WebMidi.html#getOutputById": {
                    "ref": "WebMidi.html#getOutputById",
                    "tf": 1.4705882352941175
                  }
                }
              }
            }
          }
        },
        "z": {
          "docs": {},
          "e": {
            "docs": {},
            "r": {
              "docs": {},
              "o": {
                "docs": {
                  "WebMidi.html#convertToTimestamp": {
                    "ref": "WebMidi.html#convertToTimestamp",
                    "tf": 1.3888888888888888
                  },
                  "WebMidi.html#getNoteNumberByName": {
                    "ref": "WebMidi.html#getNoteNumberByName",
                    "tf": 0.5681818181818182
                  }
                }
              }
            }
          }
        }
      },
      "length": 2192
    },
    "corpusTokens": [
      "0",
      "0x00",
      "0x01",
      "0x02",
      "0x03",
      "0x04",
      "0x05",
      "0x06",
      "0x07",
      "0x08",
      "0x09",
      "0x1",
      "0x2",
      "0x21",
      "0x3",
      "0x3d",
      "0x4",
      "0x5",
      "0x8",
      "0x9",
      "0xa",
      "0xb",
      "0xc",
      "0xd",
      "0xe",
      "0xf0",
      "0xf1",
      "0xf2",
      "0xf3",
      "0xf6",
      "0xf7",
      "0xf8",
      "0xfa",
      "0xfb",
      "0xfc",
      "0xfe",
      "0xff",
      "1",
      "1.0",
      "10",
      "100",
      "101",
      "11",
      "12",
      "120",
      "121",
      "122",
      "123",
      "124",
      "125",
      "126",
      "127",
      "13",
      "14",
      "16",
      "16383",
      "16th",
      "17",
      "18",
      "19",
      "2",
      "2020",
      "24",
      "240",
      "241",
      "242",
      "243",
      "246",
      "247",
      "248",
      "249",
      "250",
      "251",
      "252",
      "253",
      "254",
      "255",
      "3",
      "300",
      "32",
      "33",
      "34",
      "36",
      "37",
      "38",
      "39",
      "3d",
      "4",
      "40",
      "42",
      "43",
      "44",
      "45",
      "4th",
      "5",
      "6",
      "60",
      "64",
      "64kb",
      "65",
      "66",
      "67",
      "68",
      "69",
      "7",
      "70",
      "71",
      "72",
      "73",
      "74",
      "75",
      "76",
      "77",
      "78",
      "79",
      "8",
      "80",
      "81",
      "82",
      "83",
      "9",
      "91",
      "92",
      "93",
      "94",
      "95",
      "96",
      "97",
      "98",
      "99",
      "abb4",
      "abov",
      "access",
      "accord",
      "accur",
      "accuraci",
      "activ",
      "activesens",
      "actual",
      "ad",
      "adjust",
      "aftertouch",
      "allnotesoff",
      "allsoundoff",
      "alreadi",
      "alway",
      "angl",
      "anoth",
      "api",
      "april",
      "array",
      "array.&lt;outputchannel&gt",
      "array.&lt;string&gt",
      "associ",
      "asynchron",
      "author",
      "automat",
      "avail",
      "azimuth",
      "azimuthangl",
      "b",
      "b##6",
      "balancecoars",
      "balancefin",
      "bank",
      "bankselectcoars",
      "bankselectfin",
      "base",
      "basic",
      "bb",
      "be",
      "beat",
      "belong",
      "below",
      "bend",
      "between",
      "bewar",
      "binari",
      "boolean",
      "both",
      "breathcontrollercoars",
      "breathcontrollerfin",
      "bright",
      "browser",
      "buffer",
      "built",
      "byte",
      "c",
      "c3",
      "c4",
      "c5",
      "c6",
      "calcul",
      "call",
      "callback",
      "case",
      "caus",
      "celestelevel",
      "cent",
      "chang",
      "channel",
      "channel(",
      "channelaftertouch",
      "channelcoarsetun",
      "channelfinetun",
      "channelmod",
      "check",
      "choruslevel",
      "chrome",
      "cj",
      "class",
      "clear",
      "clock",
      "close",
      "coars",
      "code",
      "collector",
      "common",
      "commonj",
      "complet",
      "compos",
      "confirm",
      "connect",
      "consid",
      "console.log(\"input",
      "console.log(\"output",
      "console.log(\"system",
      "console.log(\"webmidi.j",
      "constraint",
      "consult",
      "contain",
      "continu",
      "control",
      "controlchang",
      "conveni",
      "convert",
      "converttotimestamp",
      "creat",
      "cu",
      "current",
      "custom",
      "d",
      "data",
      "databuttondecr",
      "databuttonincr",
      "dataentrycoars",
      "dataentryfin",
      "decim",
      "decrement",
      "default",
      "defin",
      "deliv",
      "depend",
      "deprec",
      "deriv",
      "desir",
      "destroy",
      "detail",
      "develop",
      "devic",
      "differ",
      "directli",
      "disabl",
      "discard",
      "disconnect",
      "dispatch",
      "display",
      "distanc",
      "distanceratio",
      "djipev",
      "do",
      "document",
      "domhighrestimestamp",
      "done",
      "doubl",
      "due",
      "e",
      "e.g",
      "each",
      "easier",
      "eb",
      "effectcontrol1coars",
      "effectcontrol1fin",
      "effectcontrol2coars",
      "effectcontrol2fin",
      "elaps",
      "elev",
      "elevationangl",
      "elsewher",
      "empti",
      "enabl",
      "end",
      "entrylsb",
      "entrymsb",
      "enum",
      "environ",
      "equival",
      "error",
      "es6",
      "esm",
      "etc",
      "even",
      "event",
      "eventemitt",
      "exampl",
      "exclus",
      "execut",
      "expect",
      "export",
      "express",
      "expressioncoars",
      "expressionfin",
      "extend",
      "extra",
      "f#4",
      "f0",
      "fall",
      "fals",
      "familiar",
      "favour",
      "file",
      "find",
      "fine",
      "fire",
      "first",
      "flat",
      "float",
      "follow",
      "footcontrollercoars",
      "footcontrollerfin",
      "form",
      "format",
      "found",
      "frame",
      "friendli",
      "fulfil",
      "function",
      "futur",
      "g4",
      "g8",
      "gain",
      "gb7",
      "gener",
      "generalpurposebutton1",
      "generalpurposebutton2",
      "generalpurposebutton3",
      "generalpurposebutton4",
      "generalpurposeslider1",
      "generalpurposeslider2",
      "generalpurposeslider3",
      "generalpurposeslider4",
      "getccnamebynumb",
      "getchannelmodebynumb",
      "getinputbyid",
      "getinputbynam",
      "getnotenumberbynam",
      "getoctav",
      "getoutputbyid",
      "getoutputbynam",
      "given",
      "global",
      "go",
      "good",
      "googl",
      "gt",
      "guessnotenumb",
      "happen",
      "help",
      "helper",
      "here",
      "hex",
      "hold2ped",
      "holdped",
      "host",
      "host'",
      "http",
      "id",
      "identifi",
      "ignor",
      "iif",
      "immedi",
      "implement",
      "import",
      "inbound",
      "includ",
      "incom",
      "incomplet",
      "increment",
      "index",
      "indic",
      "input",
      "input#connect",
      "input#destroy",
      "input#getccnamebynumb",
      "input#getchannelmodebynumb",
      "input#id",
      "input#manufactur",
      "input#nam",
      "input#nrpneventsen",
      "input#open",
      "input#st",
      "input#typ",
      "input.nrpn_typ",
      "inputchannel",
      "inputchannel#numb",
      "inputchannel#output",
      "input|fals",
      "instal",
      "instanc",
      "instanti",
      "instead",
      "instrument",
      "integ",
      "interfac",
      "invalid",
      "itself",
      "javascript",
      "jazz",
      "keep",
      "key",
      "keyaftertouch",
      "kind",
      "know",
      "korg",
      "last",
      "later",
      "legatoped",
      "length",
      "less",
      "level",
      "lever",
      "librari",
      "limit",
      "list",
      "list:class",
      "listen",
      "load",
      "localcontrol",
      "localhost",
      "logic",
      "lsb",
      "lt;async&gt",
      "lt;readonli",
      "lt;readonly&gt",
      "lt;static",
      "make",
      "manufactur",
      "match",
      "matter",
      "maximum",
      "maximumdist",
      "maximumdistancegain",
      "mean",
      "member",
      "messag",
      "method",
      "microsecond",
      "middl",
      "midi",
      "midi_channel_messag",
      "midi_channel_mode_messag",
      "midi_channel_voice_messag",
      "midi_control_change_messag",
      "midi_interface_ev",
      "midi_nrpn_messag",
      "midi_registered_paramet",
      "midi_system_messag",
      "midiaccess",
      "midimessag",
      "millisecond",
      "mode",
      "modul",
      "modulationrang",
      "modulationwheelcoars",
      "modulationwheelfin",
      "monomodeon",
      "ms",
      "msb",
      "name",
      "nativ",
      "navig",
      "navigator.requestmidiaccess",
      "necessari",
      "need",
      "never",
      "new",
      "non",
      "none",
      "nonregisteredparametercoars",
      "nonregisteredparameterfin",
      "notat",
      "note",
      "noteoff",
      "noteon",
      "now",
      "nrpn",
      "nrpn_type",
      "nrpneventsen",
      "nullable&gt",
      "nullactiveparamet",
      "number",
      "number&gt",
      "number|fals",
      "numer",
      "object",
      "object.&lt;str",
      "octav",
      "octaveoffset",
      "offer",
      "offset",
      "omnimodeoff",
      "omnimodeon",
      "on",
      "open",
      "oper",
      "option",
      "order",
      "origin",
      "other",
      "otherwis",
      "out",
      "outbound",
      "outgo",
      "output",
      "output#channel",
      "output#clear",
      "output#clos",
      "output#connect",
      "output#destroy",
      "output#id",
      "output#manufactur",
      "output#nam",
      "output#open",
      "output#send",
      "output#sendactivesens",
      "output#sendchannelaftertouch",
      "output#sendclock",
      "output#sendcontinu",
      "output#sendcontrolchang",
      "output#sendkeyaftertouch",
      "output#sendreset",
      "output#sendsongposit",
      "output#sendsongselect",
      "output#sendstart",
      "output#sendstop",
      "output#sendsysex",
      "output#sendtimecodequarterfram",
      "output#sendtunerequest",
      "output#setpitchbendrang",
      "output#setregisteredparamet",
      "output#st",
      "output#typ",
      "outputchannel",
      "outputchannel#numb",
      "outputchannel#output",
      "outputchannel#send",
      "outputchannel#sendchannelaftertouch",
      "outputchannel#sendcontrolchang",
      "outputchannel#sendkeyaftertouch",
      "output|fals",
      "over",
      "page",
      "pair",
      "pan",
      "pancoars",
      "panfin",
      "panspreadangl",
      "paramet",
      "paramlsb",
      "parammsb",
      "pars",
      "part",
      "pass",
      "pend",
      "per",
      "phaserlevel",
      "pitch",
      "pitchbend",
      "pitchbendrang",
      "place",
      "platform",
      "playback",
      "playnot",
      "pleas",
      "plu",
      "plugin",
      "point",
      "polymodeon",
      "port",
      "port'",
      "portamento",
      "portamentotimecoars",
      "portamentotimefin",
      "ports.input",
      "ports.output",
      "posit",
      "prepend",
      "pressur",
      "previous",
      "probabl",
      "process",
      "program",
      "programchang",
      "promis",
      "promise.&lt;(void|any)&gt",
      "promise.&lt;input&gt",
      "promise.&lt;object&gt",
      "promise.&lt;output&gt",
      "promise.&lt;void&gt",
      "prompt",
      "proof",
      "properti",
      "provid",
      "purpos",
      "quarter",
      "queu",
      "rang",
      "ratio",
      "react",
      "readm",
      "readonly&gt",
      "real",
      "reason",
      "receiv",
      "refer",
      "referencedistanceratio",
      "regist",
      "registeredparametercoars",
      "registeredparameterfin",
      "rel",
      "relay",
      "report",
      "repres",
      "request",
      "reset",
      "resetallcontrol",
      "resolv",
      "reson",
      "respect",
      "result",
      "resum",
      "return",
      "reverblevel",
      "roll",
      "rollangl",
      "s",
      "same",
      "sanit",
      "sanitizechannel",
      "schedul",
      "scientif",
      "secur",
      "see",
      "select",
      "semiton",
      "send",
      "sendactivesens",
      "sendchannelaftertouch",
      "sendclock",
      "sendcontinu",
      "sendcontrolchang",
      "sendkeyaftertouch",
      "sendreset",
      "sendsongposit",
      "sendsongselect",
      "sendstart",
      "sendstop",
      "sendsysex",
      "sendsystemmessag",
      "sendtimecodequarterfram",
      "sendtunerequest",
      "sens",
      "sent",
      "sequenc",
      "serv",
      "set",
      "setmastertun",
      "setmodulationrang",
      "setpitchbendrang",
      "setregisteredparamet",
      "sharp",
      "sign",
      "silent",
      "simpler",
      "simpli",
      "simplifi",
      "singl",
      "softped",
      "softwar",
      "song",
      "songposit",
      "songselect",
      "soon",
      "sound",
      "soundattacktim",
      "soundcontrol10",
      "soundcontrol6",
      "soundcontrol7",
      "soundcontrol8",
      "soundcontrol8:`77",
      "soundcontrol9",
      "soundreleasetim",
      "soundvari",
      "spec",
      "special",
      "specif",
      "specifi",
      "spread",
      "standard",
      "start",
      "state",
      "statu",
      "still",
      "stop",
      "stopnot",
      "stream",
      "string",
      "string|fals",
      "sub",
      "subsystem",
      "subsystem'",
      "successfulli",
      "such",
      "suggest",
      "sum",
      "summari",
      "support",
      "sustenutoped",
      "symbol",
      "synth",
      "synthes",
      "sysex",
      "sysexen",
      "sysexend",
      "system",
      "tabl",
      "talk",
      "tame",
      "tell",
      "termin",
      "therefor",
      "though",
      "through",
      "throw",
      "time",
      "timecod",
      "timestamp",
      "toward",
      "tremololevel",
      "tri",
      "trigger",
      "true",
      "tune",
      "tuningbank",
      "tuningprogram",
      "tuningrequest",
      "two",
      "type",
      "undefin",
      "undefined/reserv",
      "under",
      "unknownsystemmessag",
      "unless",
      "unlink",
      "up",
      "us",
      "usag",
      "user",
      "usual",
      "v3.0",
      "v3.x",
      "v77",
      "valid",
      "valu",
      "variou",
      "veri",
      "version",
      "via",
      "view",
      "voic",
      "volumecoars",
      "volumefin",
      "wait",
      "want",
      "warn",
      "way",
      "web",
      "webmidi",
      "webmidi#converttotimestamp",
      "webmidi#dis",
      "webmidi#en",
      "webmidi#getinputbyid",
      "webmidi#getinputbynam",
      "webmidi#getnotenumberbynam",
      "webmidi#getoctav",
      "webmidi#getoutputbyid",
      "webmidi#getoutputbynam",
      "webmidi#guessnotenumb",
      "webmidi#input",
      "webmidi#interfac",
      "webmidi#midi_channel_messag",
      "webmidi#midi_channel_mode_messag",
      "webmidi#midi_channel_voice_messag",
      "webmidi#midi_control_change_messag",
      "webmidi#midi_interface_ev",
      "webmidi#midi_nrpn_messag",
      "webmidi#midi_registered_paramet",
      "webmidi#midi_system_messag",
      "webmidi#not",
      "webmidi#octaveoffset",
      "webmidi#output",
      "webmidi#sanitizechannel",
      "webmidi#support",
      "webmidi#sysexen",
      "webmidi#tim",
      "webmidi.addlistener(\"en",
      "webmidi.en",
      "webmidi.enable().then(port",
      "webmidi.enable({callback",
      "webmidi.enable({sysex",
      "webmidi.j",
      "webmidi.outputs[0].sendsysex(0x42",
      "webmidi.outputs[0].sendsysex(66",
      "webmidi.outputs[0].sendsysex([0x00",
      "webmidiapishim.j",
      "whether",
      "whose",
      "wide",
      "work",
      "zero"
    ],
    "pipeline": [
      "trimmer",
      "stopWordFilter",
      "stemmer"
    ]
  },
  "store": {
    "index.html": {
      "id": "index.html",
      "kind": "readme",
      "title": "WebMidi.js",
      "longname": "index",
      "name": "WebMidi.js",
      "tags": "index",
      "summary": "A JavaScript library to help you tame the Web MIDI API",
      "description": "",
      "body": ""
    },
    "global.html": {
      "id": "global.html",
      "kind": "global",
      "title": "Globals",
      "longname": "global",
      "name": "Globals",
      "tags": "global",
      "summary": "All documented globals.",
      "description": "",
      "body": ""
    },
    "list_class.html": {
      "id": "list_class.html",
      "kind": "list",
      "title": "Classes",
      "longname": "list:class",
      "name": "Classes",
      "tags": "list:class",
      "summary": "All documented classes.",
      "description": "",
      "body": ""
    },
    "Input.html": {
      "id": "Input.html",
      "kind": "class",
      "title": "Input",
      "longname": "Input",
      "name": "Input",
      "tags": "Input",
      "summary": "",
      "description": "The Input class represents a MIDI input port. This object is derived from the host's MIDI subsystem and cannot be instantiated directly. This is the reason why WebMidi.js does not export this class. You can find a list of all available Input objects in the WebMidi#inputs array.",
      "body": ""
    },
    "Input.html#.NRPN_TYPES": {
      "id": "Input.html#.NRPN_TYPES",
      "kind": "member",
      "title": "&lt;static, readonly&gt; NRPN_TYPES :Array.&lt;string&gt;",
      "longname": "Input.NRPN_TYPES",
      "name": "NRPN_TYPES",
      "tags": "Input.NRPN_TYPES NRPN_TYPES",
      "summary": "",
      "description": "Array of valid non-registered parameter number (NRPNs) types."
    },
    "Input.html#connection": {
      "id": "Input.html#connection",
      "kind": "member",
      "title": "&lt;readonly&gt; connection :string",
      "longname": "Input#connection",
      "name": "connection",
      "tags": "Input#connection connection",
      "summary": "",
      "description": "Input port's connection state: \"pending\", \"open\" or \"closed\"."
    },
    "Input.html#id": {
      "id": "Input.html#id",
      "kind": "member",
      "title": "&lt;readonly&gt; id :string",
      "longname": "Input#id",
      "name": "id",
      "tags": "Input#id id",
      "summary": "",
      "description": "ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for the same port."
    },
    "Input.html#manufacturer": {
      "id": "Input.html#manufacturer",
      "kind": "member",
      "title": "&lt;readonly&gt; manufacturer :string",
      "longname": "Input#manufacturer",
      "name": "manufacturer",
      "tags": "Input#manufacturer manufacturer",
      "summary": "",
      "description": "Name of the manufacturer of the device that makes this input port available."
    },
    "Input.html#name": {
      "id": "Input.html#name",
      "kind": "member",
      "title": "name :String",
      "longname": "Input#name",
      "name": "name",
      "tags": "Input#name name",
      "summary": "",
      "description": "Name of the MIDI input"
    },
    "Input.html#nrpnEventsEnabled": {
      "id": "Input.html#nrpnEventsEnabled",
      "kind": "member",
      "title": "nrpnEventsEnabled :Boolean",
      "longname": "Input#nrpnEventsEnabled",
      "name": "nrpnEventsEnabled",
      "tags": "Input#nrpnEventsEnabled nrpnEventsEnabled",
      "summary": "",
      "description": "Indicates whether the Input should dispatch events for Non-Registered Parameter Number. This is a system-wide setting. NRPNs are composed of a sequence of specific control change messages. When a valid sequence of such control change messages is received, an nrpn event will fire. If an invalid or out of order control change message is received, it will fall through the collector logic and all buffered control change messages will be discarded as incomplete."
    },
    "Input.html#state": {
      "id": "Input.html#state",
      "kind": "member",
      "title": "&lt;readonly&gt; state :string",
      "longname": "Input#state",
      "name": "state",
      "tags": "Input#state state",
      "summary": "",
      "description": "State of the input port: \"connected\" or \"disconnected\"."
    },
    "Input.html#type": {
      "id": "Input.html#type",
      "kind": "member",
      "title": "&lt;readonly&gt; type :string",
      "longname": "Input#type",
      "name": "type",
      "tags": "Input#type type",
      "summary": "",
      "description": "Type of the input port (\"input\")"
    },
    "Input.html#destroy": {
      "id": "Input.html#destroy",
      "kind": "function",
      "title": "&lt;async&gt; destroy() → {Promise.&lt;void&gt;}",
      "longname": "Input#destroy",
      "name": "destroy",
      "tags": "Input#destroy destroy",
      "summary": "",
      "description": ""
    },
    "Input.html#getCcNameByNumber": {
      "id": "Input.html#getCcNameByNumber",
      "kind": "function",
      "title": "getCcNameByNumber( number ) → {string|false}",
      "longname": "Input#getCcNameByNumber",
      "name": "getCcNameByNumber",
      "tags": "Input#getCcNameByNumber getCcNameByNumber",
      "summary": "",
      "description": "Returns the name of a control change message matching the specified number. If no match is found, the function returns false."
    },
    "Input.html#getChannelModeByNumber": {
      "id": "Input.html#getChannelModeByNumber",
      "kind": "function",
      "title": "getChannelModeByNumber( number ) → {string|false}",
      "longname": "Input#getChannelModeByNumber",
      "name": "getChannelModeByNumber",
      "tags": "Input#getChannelModeByNumber getChannelModeByNumber",
      "summary": "",
      "description": "Returns the channel mode name matching the specified number. If no match is found, the function returns false."
    },
    "Input.html#open": {
      "id": "Input.html#open",
      "kind": "function",
      "title": "&lt;async&gt; open() → {Promise.&lt;Input&gt;}",
      "longname": "Input#open",
      "name": "open",
      "tags": "Input#open open",
      "summary": "",
      "description": "Opens the input for usage."
    },
    "InputChannel.html": {
      "id": "InputChannel.html",
      "kind": "class",
      "title": "InputChannel",
      "longname": "InputChannel",
      "name": "InputChannel",
      "tags": "InputChannel",
      "summary": "",
      "description": "InputChannel class...",
      "body": ""
    },
    "InputChannel.html#number": {
      "id": "InputChannel.html#number",
      "kind": "member",
      "title": "number :number",
      "longname": "InputChannel#number",
      "name": "number",
      "tags": "InputChannel#number number",
      "summary": "",
      "description": "The channel number (1-16)"
    },
    "InputChannel.html#output": {
      "id": "InputChannel.html#output",
      "kind": "member",
      "title": "output :Output",
      "longname": "InputChannel#output",
      "name": "output",
      "tags": "InputChannel#output output",
      "summary": "",
      "description": "The output this channel belongs to"
    },
    "Output.html": {
      "id": "Output.html",
      "kind": "class",
      "title": "Output",
      "longname": "Output",
      "name": "Output",
      "tags": "Output",
      "summary": "",
      "description": "The Output class represents a MIDI output port. This object is derived from the host's MIDI subsystem and cannot be instantiated directly. This is the reason why WebMidi.js does not export this class. You can find a list of all available Output objects in the WebMidi#outputs array.",
      "body": ""
    },
    "Output.html#channels": {
      "id": "Output.html#channels",
      "kind": "member",
      "title": "channels :Array.&lt;OutputChannel&gt;",
      "longname": "Output#channels",
      "name": "channels",
      "tags": "Output#channels channels",
      "summary": "",
      "description": "Array containing the 16 OutputChannel objects available for this Output (1-16)"
    },
    "Output.html#connection": {
      "id": "Output.html#connection",
      "kind": "member",
      "title": "&lt;readonly&gt; connection :string",
      "longname": "Output#connection",
      "name": "connection",
      "tags": "Output#connection connection",
      "summary": "",
      "description": "Output port's connection state: \"pending\", \"open\" or \"closed\"."
    },
    "Output.html#id": {
      "id": "Output.html#id",
      "kind": "member",
      "title": "&lt;readonly&gt; id :string",
      "longname": "Output#id",
      "name": "id",
      "tags": "Output#id id",
      "summary": "",
      "description": "ID string of the MIDI output. The ID is host-specific. Do not expect the same ID on different platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for the same port."
    },
    "Output.html#manufacturer": {
      "id": "Output.html#manufacturer",
      "kind": "member",
      "title": "&lt;readonly&gt; manufacturer :string",
      "longname": "Output#manufacturer",
      "name": "manufacturer",
      "tags": "Output#manufacturer manufacturer",
      "summary": "",
      "description": "Name of the manufacturer of the device that makes this output port available."
    },
    "Output.html#name": {
      "id": "Output.html#name",
      "kind": "member",
      "title": "&lt;readonly&gt; name :string",
      "longname": "Output#name",
      "name": "name",
      "tags": "Output#name name",
      "summary": "",
      "description": "Name of the MIDI output"
    },
    "Output.html#state": {
      "id": "Output.html#state",
      "kind": "member",
      "title": "&lt;readonly&gt; state :string",
      "longname": "Output#state",
      "name": "state",
      "tags": "Output#state state",
      "summary": "",
      "description": "State of the output port: \"connected\" or \"disconnected\"."
    },
    "Output.html#type": {
      "id": "Output.html#type",
      "kind": "member",
      "title": "&lt;readonly&gt; type :string",
      "longname": "Output#type",
      "name": "type",
      "tags": "Output#type type",
      "summary": "",
      "description": "Type of the output port (\"output\")"
    },
    "Output.html#clear": {
      "id": "Output.html#clear",
      "kind": "function",
      "title": "clear() → {Output}",
      "longname": "Output#clear",
      "name": "clear",
      "tags": "Output#clear clear",
      "summary": "",
      "description": "Clears all messages that have been queued but not yet delivered. Warning: this method has been defined in the specification but has not been implemented yet. As soon as browsers implement it, it will work."
    },
    "Output.html#close": {
      "id": "Output.html#close",
      "kind": "function",
      "title": "&lt;async&gt; close() → {Promise.&lt;(void|any)&gt;}",
      "longname": "Output#close",
      "name": "close",
      "tags": "Output#close close",
      "summary": "",
      "description": "Closes the output. When an output is closed, it cannot be used to send MIDI messages."
    },
    "Output.html#destroy": {
      "id": "Output.html#destroy",
      "kind": "function",
      "title": "&lt;async&gt; destroy() → {Promise.&lt;void&gt;}",
      "longname": "Output#destroy",
      "name": "destroy",
      "tags": "Output#destroy destroy",
      "summary": "",
      "description": ""
    },
    "Output.html#open": {
      "id": "Output.html#open",
      "kind": "function",
      "title": "&lt;async&gt; open() → {Promise.&lt;Output&gt;}",
      "longname": "Output#open",
      "name": "open",
      "tags": "Output#open open",
      "summary": "",
      "description": "Opens the output for usage."
    },
    "Output.html#send": {
      "id": "Output.html#send",
      "kind": "function",
      "title": "send( status [, data [, timestamp ] ] ) → {Output}",
      "longname": "Output#send",
      "name": "send",
      "tags": "Output#send send",
      "summary": "",
      "description": "Sends a MIDI message on the MIDI output port, at the scheduled timestamp. Unless, you are familiar with the details of the MIDI message format, you should not use this method directly. Instead, use one of the simpler helper methods: playNote(), stopNote(), sendControlChange(), sendSystemMessage(), etc. Details on the format of MIDI messages are available in the summary of MIDI messages from the MIDI Manufacturers Association."
    },
    "Output.html#sendActiveSensing": {
      "id": "Output.html#sendActiveSensing",
      "kind": "function",
      "title": "sendActiveSensing( [ options ] ) → {Output}",
      "longname": "Output#sendActiveSensing",
      "name": "sendActiveSensing",
      "tags": "Output#sendActiveSensing sendActiveSensing",
      "summary": "",
      "description": "Sends an Active Sensing real-time message. This tells the device connected to this port that the connection is still good. Active sensing messages should be sent every 300 ms if there was no other activity on the MIDI port."
    },
    "Output.html#sendChannelAftertouch": {
      "id": "Output.html#sendChannelAftertouch",
      "kind": "function",
      "title": "sendChannelAftertouch( [ pressure [, channel [, options ] ] ] ) → {Output}",
      "longname": "Output#sendChannelAftertouch",
      "name": "sendChannelAftertouch",
      "tags": "Output#sendChannelAftertouch sendChannelAftertouch",
      "summary": "",
      "description": "Sends a MIDI channel aftertouch message to the specified channel(s). For key-specific aftertouch, you should instead use sendKeyAftertouch()."
    },
    "Output.html#sendClock": {
      "id": "Output.html#sendClock",
      "kind": "function",
      "title": "sendClock( [ options ] ) → {Output}",
      "longname": "Output#sendClock",
      "name": "sendClock",
      "tags": "Output#sendClock sendClock",
      "summary": "",
      "description": "Sends a MIDI Clock real-time message. According to the standard, there are 24 MIDI Clocks for every quarter note."
    },
    "Output.html#sendContinue": {
      "id": "Output.html#sendContinue",
      "kind": "function",
      "title": "sendContinue( [ options ] ) → {WebMidi}",
      "longname": "Output#sendContinue",
      "name": "sendContinue",
      "tags": "Output#sendContinue sendContinue",
      "summary": "",
      "description": "Sends a Continue real-time message. This resumes song playback where it was previously stopped or where it was last cued with a song position message. To start playback from the start, use the sendStart()` method."
    },
    "Output.html#sendControlChange": {
      "id": "Output.html#sendControlChange",
      "kind": "function",
      "title": "sendControlChange( controller [, value [, channel [, options ] ] ] ) → {Output}",
      "longname": "Output#sendControlChange",
      "name": "sendControlChange",
      "tags": "Output#sendControlChange sendControlChange",
      "summary": "",
      "description": "Sends a MIDI control change message to the specified channel(s) at the scheduled time. The control change message to send can be specified numerically or by using one of the following common names: bankselectcoarse (#0) modulationwheelcoarse (#1) breathcontrollercoarse (#2) footcontrollercoarse (#4) portamentotimecoarse (#5) dataentrycoarse (#6) volumecoarse (#7) balancecoarse (#8) pancoarse (#10) expressioncoarse (#11) effectcontrol1coarse (#12) effectcontrol2coarse (#13) generalpurposeslider1 (#16) generalpurposeslider2 (#17) generalpurposeslider3 (#18) generalpurposeslider4 (#19) bankselectfine (#32) modulationwheelfine (#33) breathcontrollerfine (#34) footcontrollerfine (#36) portamentotimefine (#37) dataentryfine (#38) volumefine (#39) balancefine (#40) panfine (#42) expressionfine (#43) effectcontrol1fine (#44) effectcontrol2fine (#45) holdpedal (#64) portamento (#65) sustenutopedal (#66) softpedal (#67) legatopedal (#68) hold2pedal (#69) soundvariation (#70) resonance (#71) soundreleasetime (#72) soundattacktime (#73) brightness (#74) soundcontrol6 (#75) soundcontrol7 (#76) soundcontrol8 (#77) soundcontrol9 (#78) soundcontrol10 (#79) generalpurposebutton1 (#80) generalpurposebutton2 (#81) generalpurposebutton3 (#82) generalpurposebutton4 (#83) reverblevel (#91) tremololevel (#92) choruslevel (#93) celestelevel (#94) phaserlevel (#95) databuttonincrement (#96) databuttondecrement (#97) nonregisteredparametercoarse (#98) nonregisteredparameterfine (#99) registeredparametercoarse (#100) registeredparameterfine (#101) Note: as you can see above, not all control change message have a matching common name. This does not mean you cannot use the others. It simply means you will need to use their number instead of their name. To view a list of all available control change messages, please consult \"Table 3 - Control Change Messages\" from the MIDI Messages specification."
    },
    "Output.html#sendKeyAftertouch": {
      "id": "Output.html#sendKeyAftertouch",
      "kind": "function",
      "title": "sendKeyAftertouch( note, channel [, pressure [, options ] ] ) → {Output}",
      "longname": "Output#sendKeyAftertouch",
      "name": "sendKeyAftertouch",
      "tags": "Output#sendKeyAftertouch sendKeyAftertouch",
      "summary": "",
      "description": "Sends a MIDI key aftertouch message to the specified channel(s) at the scheduled time. This is a key-specific aftertouch. For a channel-wide aftertouch message, use sendChannelAftertouch()."
    },
    "Output.html#sendReset": {
      "id": "Output.html#sendReset",
      "kind": "function",
      "title": "sendReset( [ options ] ) → {Output}",
      "longname": "Output#sendReset",
      "name": "sendReset",
      "tags": "Output#sendReset sendReset",
      "summary": "",
      "description": "Sends a Reset real-time message. This tells the device connected to this output that it should reset itself to a default state."
    },
    "Output.html#sendSongPosition": {
      "id": "Output.html#sendSongPosition",
      "kind": "function",
      "title": "sendSongPosition( [ value [, options ] ] ) → {Output}",
      "longname": "Output#sendSongPosition",
      "name": "sendSongPosition",
      "tags": "Output#sendSongPosition sendSongPosition",
      "summary": "",
      "description": "Sends a Song Position MIDI message. The value is expressed in MIDI beats (between 0 and 16383) which are 16th note. Position 0 is always the start of the song."
    },
    "Output.html#sendSongSelect": {
      "id": "Output.html#sendSongSelect",
      "kind": "function",
      "title": "sendSongSelect( value [, options ] ) → {Output}",
      "longname": "Output#sendSongSelect",
      "name": "sendSongSelect",
      "tags": "Output#sendSongSelect sendSongSelect",
      "summary": "",
      "description": "Sends a Song Select MIDI message. Beware that some devices display position 0 as position 1 (for user-friendliness)."
    },
    "Output.html#sendStart": {
      "id": "Output.html#sendStart",
      "kind": "function",
      "title": "sendStart( [ options ] ) → {Output}",
      "longname": "Output#sendStart",
      "name": "sendStart",
      "tags": "Output#sendStart sendStart",
      "summary": "",
      "description": "Sends a Start real-time message. A MIDI Start message starts the playback of the current song at beat 0. To start playback elsewhere in the song, use the sendContinue() method."
    },
    "Output.html#sendStop": {
      "id": "Output.html#sendStop",
      "kind": "function",
      "title": "sendStop( [ options ] ) → {Output}",
      "longname": "Output#sendStop",
      "name": "sendStop",
      "tags": "Output#sendStop sendStop",
      "summary": "",
      "description": "Sends a Stop real-time message. This tells the device connected to this output to stop playback immediately (or at the scheduled time)."
    },
    "Output.html#sendSysex": {
      "id": "Output.html#sendSysex",
      "kind": "function",
      "title": "sendSysex( manufacturer [, data [, options ] ] ) → {Output}",
      "longname": "Output#sendSysex",
      "name": "sendSysex",
      "tags": "Output#sendSysex sendSysex",
      "summary": "",
      "description": "Sends a MIDI system exclusive (sysex) message. The generated message will automatically be prepended with the sysex byte (0xF0) and terminated with the end of sysex byte (0xF7). To use the sendSysex() method, system exclusive message support must have been enabled. To do so, you must set the sysex option to true when calling WebMidi.enable(): WebMidi.enable({sysex: true}) .then(() =&gt; console.log(\"System exclusive messages are enabled\"); Note that, depending on browser, version and platform, it is generally necessary to serve the page over HTTPS to enable sysex support. Examples If you want to send a sysex message to a Korg device connected to the first output, you would use the following code: WebMidi.outputs[0].sendSysex(0x42, [0x1, 0x2, 0x3, 0x4, 0x5]); The parameters can be specified using any number notation (decimal, hex, binary, etc.). Therefore, the code below is equivalent to the code above: WebMidi.outputs[0].sendSysex(66, [1, 2, 3, 4, 5]); The above code sends the byte values 1, 2, 3, 4 and 5 to Korg devices (hex 42 is the same as decimal 66). Some manufacturers are identified using 3 bytes. In this case, you would use a 3-position array as the first parameter. For example, to send the same sysex message to a Native Instruments device: WebMidi.outputs[0].sendSysex([0x00, 0x21, 0x09], [0x1, 0x2, 0x3, 0x4, 0x5]); There is no limit for the length of the data array. However, it is generally suggested to keep system exclusive messages to 64Kb or less."
    },
    "Output.html#sendTimecodeQuarterFrame": {
      "id": "Output.html#sendTimecodeQuarterFrame",
      "kind": "function",
      "title": "sendTimecodeQuarterFrame( value [, options ] ) → {Output}",
      "longname": "Output#sendTimecodeQuarterFrame",
      "name": "sendTimecodeQuarterFrame",
      "tags": "Output#sendTimecodeQuarterFrame sendTimecodeQuarterFrame",
      "summary": "",
      "description": "Sends a MIDI Timecode Quarter Frame message. Please note that no processing is being done on the data. It is up to the developer to format the data according to the MIDI Timecode format."
    },
    "Output.html#sendTuneRequest": {
      "id": "Output.html#sendTuneRequest",
      "kind": "function",
      "title": "sendTuneRequest( [ options ] ) → {Output}",
      "longname": "Output#sendTuneRequest",
      "name": "sendTuneRequest",
      "tags": "Output#sendTuneRequest sendTuneRequest",
      "summary": "",
      "description": "Sends a MIDI tune request real-time message."
    },
    "Output.html#setPitchBendRange": {
      "id": "Output.html#setPitchBendRange",
      "kind": "function",
      "title": "setPitchBendRange( semitones [, cents [, channel [, options ] ] ] ) → {Output}",
      "longname": "Output#setPitchBendRange",
      "name": "setPitchBendRange",
      "tags": "Output#setPitchBendRange setPitchBendRange",
      "summary": "",
      "description": "Sends a pitch bend range message to the specified channel(s) at the scheduled time so that they adjust the range used by their pitch bend lever. The range can be specified with the semitones parameter (msb), the cents parameter (lsb) or by specifying both parameters at the same time."
    },
    "Output.html#setRegisteredParameter": {
      "id": "Output.html#setRegisteredParameter",
      "kind": "function",
      "title": "setRegisteredParameter( parameter [, data [, channel [, options ] ] ] ) → {Output}",
      "longname": "Output#setRegisteredParameter",
      "name": "setRegisteredParameter",
      "tags": "Output#setRegisteredParameter setRegisteredParameter",
      "summary": "",
      "description": "Sets the specified MIDI registered parameter to the desired value. The value is defined with up to two bytes of data that each can go from 0 to 127. Unless you are very familiar with the MIDI standard you probably should favour one of the simpler to use functions such as: setPitchBendRange(), setModulationRange(), setMasterTuning(), etc. MIDI registered parameters extend the original list of control change messages. The MIDI 1.0 specification lists only a limited number of them. Here are the original registered parameters with the identifier that can be used as the first parameter of this function: Pitchbend Range (0x00, 0x00): \"pitchbendrange\" Channel Fine Tuning (0x00, 0x01): \"channelfinetuning\" Channel Coarse Tuning (0x00, 0x02): \"channelcoarsetuning\" Tuning Program (0x00, 0x03): \"tuningprogram\" Tuning Bank (0x00, 0x04): \"tuningbank\" Modulation Range (0x00, 0x05): \"modulationrange\" Note that the Tuning Program and Tuning Bank parameters are part of the MIDI Tuning Standard, which is not widely implemented. Another set of extra parameters have been later added for 3D sound controllers. They are: Azimuth Angle (0x3D, 0x00): azimuthangle Elevation Angle (0x3D, 0x01): elevationangle Gain (0x3D, 0x02): gain Distance Ratio (0x3D, 0x03): distanceratio Maximum Distance (0x3D, 0x04): maximumdistance Maximum Distance Gain (0x3D, 0x05): maximumdistancegain Reference Distance Ratio (0x3D, 0x06): referencedistanceratio Pan Spread Angle (0x3D, 0x07): panspreadangle Roll Angle (0x3D, 0x08): rollangle"
    },
    "OutputChannel.html": {
      "id": "OutputChannel.html",
      "kind": "class",
      "title": "OutputChannel",
      "longname": "OutputChannel",
      "name": "OutputChannel",
      "tags": "OutputChannel",
      "summary": "",
      "description": "OutputChannel class...",
      "body": ""
    },
    "OutputChannel.html#number": {
      "id": "OutputChannel.html#number",
      "kind": "member",
      "title": "number :number",
      "longname": "OutputChannel#number",
      "name": "number",
      "tags": "OutputChannel#number number",
      "summary": "",
      "description": "The channel number (1-16)"
    },
    "OutputChannel.html#output": {
      "id": "OutputChannel.html#output",
      "kind": "member",
      "title": "output :Output",
      "longname": "OutputChannel#output",
      "name": "output",
      "tags": "OutputChannel#output output",
      "summary": "",
      "description": "The output this channel belongs to"
    },
    "OutputChannel.html#send": {
      "id": "OutputChannel.html#send",
      "kind": "function",
      "title": "send( status [, data [, timestamp ] ] ) → {Output}",
      "longname": "OutputChannel#send",
      "name": "send",
      "tags": "OutputChannel#send send",
      "summary": "",
      "description": "Sends a MIDI message at the scheduled timestamp. Unless, you are familiar with the details of the MIDI message format, you should not use this method directly. Instead, use one of the simpler helper methods: playNote(), stopNote(), sendControlChange(), etc. Details on the format of MIDI messages are available in the summary of MIDI messages from the MIDI Manufacturers Association."
    },
    "OutputChannel.html#sendControlChange": {
      "id": "OutputChannel.html#sendControlChange",
      "kind": "function",
      "title": "sendControlChange( controller [, value [, options ] ] ) → {Output}",
      "longname": "OutputChannel#sendControlChange",
      "name": "sendControlChange",
      "tags": "OutputChannel#sendControlChange sendControlChange",
      "summary": "",
      "description": "Sends a MIDI control change message to the channel at the scheduled time. The control change message to send can be specified numerically or by using one of the following common names: bankselectcoarse (#0) modulationwheelcoarse (#1) breathcontrollercoarse (#2) footcontrollercoarse (#4) portamentotimecoarse (#5) dataentrycoarse (#6) volumecoarse (#7) balancecoarse (#8) pancoarse (#10) expressioncoarse (#11) effectcontrol1coarse (#12) effectcontrol2coarse (#13) generalpurposeslider1 (#16) generalpurposeslider2 (#17) generalpurposeslider3 (#18) generalpurposeslider4 (#19) bankselectfine (#32) modulationwheelfine (#33) breathcontrollerfine (#34) footcontrollerfine (#36) portamentotimefine (#37) dataentryfine (#38) volumefine (#39) balancefine (#40) panfine (#42) expressionfine (#43) effectcontrol1fine (#44) effectcontrol2fine (#45) holdpedal (#64) portamento (#65) sustenutopedal (#66) softpedal (#67) legatopedal (#68) hold2pedal (#69) soundvariation (#70) resonance (#71) soundreleasetime (#72) soundattacktime (#73) brightness (#74) soundcontrol6 (#75) soundcontrol7 (#76) soundcontrol8 (#77) soundcontrol9 (#78) soundcontrol10 (#79) generalpurposebutton1 (#80) generalpurposebutton2 (#81) generalpurposebutton3 (#82) generalpurposebutton4 (#83) reverblevel (#91) tremololevel (#92) choruslevel (#93) celestelevel (#94) phaserlevel (#95) databuttonincrement (#96) databuttondecrement (#97) nonregisteredparametercoarse (#98) nonregisteredparameterfine (#99) registeredparametercoarse (#100) registeredparameterfine (#101) Note: as you can see above, not all control change message have a matching common name. This does not mean you cannot use the others. It simply means you will need to use their number instead of their name. To view a detailed list of all available control change messages, please consult \"Table 3 - Control Change Messages\" from the MIDI Messages specification."
    },
    "OutputChannel.html#sendKeyAftertouch": {
      "id": "OutputChannel.html#sendKeyAftertouch",
      "kind": "function",
      "title": "sendKeyAftertouch( note [, pressure [, options ] ] ) → {OutputChannel}",
      "longname": "OutputChannel#sendKeyAftertouch",
      "name": "sendKeyAftertouch",
      "tags": "OutputChannel#sendKeyAftertouch sendKeyAftertouch",
      "summary": "",
      "description": "Sends a MIDI key aftertouch message at the scheduled time. This is a key-specific aftertouch. For a channel-wide aftertouch message, use OutputChannel#sendChannelAftertouch."
    },
    "WebMidi.html": {
      "id": "WebMidi.html",
      "kind": "class",
      "title": "WebMidi",
      "longname": "WebMidi",
      "name": "WebMidi",
      "tags": "WebMidi",
      "summary": "",
      "description": "The WebMidi object makes it easier to work with the Web MIDI API. Basically, it simplifies sending outgoing MIDI messages and reacting to incoming MIDI messages. When using the WebMidi.js library, the WebMidi class has already been instantiated for you. If you use the IIFE version, you should simply use the global object called WebMidi. If you use the CJS (CommonJS) or ESM (ES6 module) version, you get an already-instantiated object. This means there is no need to instantiate a new WebMidi object directly. The WebMidi object extends the EventEmitter class from the djipevents module.",
      "body": ""
    },
    "WebMidi.html#enabled": {
      "id": "WebMidi.html#enabled",
      "kind": "member",
      "title": "&lt;readonly&gt; enabled :boolean",
      "longname": "WebMidi#enabled",
      "name": "enabled",
      "tags": "WebMidi#enabled enabled",
      "summary": "",
      "description": "Indicates whether access to the host's MIDI subsystem is active or not."
    },
    "WebMidi.html#inputs": {
      "id": "WebMidi.html#inputs",
      "kind": "member",
      "title": "&lt;readonly&gt; inputs :Array",
      "longname": "WebMidi#inputs",
      "name": "inputs",
      "tags": "WebMidi#inputs inputs",
      "summary": "",
      "description": "An array of all currently available MIDI inputs."
    },
    "WebMidi.html#interface": {
      "id": "WebMidi.html#interface",
      "kind": "member",
      "title": "&lt;readonly, nullable&gt; interface :MIDIAccess",
      "longname": "WebMidi#interface",
      "name": "interface",
      "tags": "WebMidi#interface interface",
      "summary": "",
      "description": "The MIDIAccess instance used to talk to the Web MIDI API. This should not be used directly unless you know what you are doing."
    },
    "WebMidi.html#MIDI_CHANNEL_MESSAGES": {
      "id": "WebMidi.html#MIDI_CHANNEL_MESSAGES",
      "kind": "member",
      "title": "&lt;readonly&gt; MIDI_CHANNEL_MESSAGES :Object.&lt;string, number&gt;",
      "longname": "WebMidi#MIDI_CHANNEL_MESSAGES",
      "name": "MIDI_CHANNEL_MESSAGES",
      "tags": "WebMidi#MIDI_CHANNEL_MESSAGES MIDI_CHANNEL_MESSAGES",
      "summary": "",
      "description": "Enum of all MIDI channel voice messages and their associated numerical value. Note that it has been deprecated since v3.0. You should now use MIDI_CHANNEL_VOICE_MESSAGES."
    },
    "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES": {
      "id": "WebMidi.html#MIDI_CHANNEL_MODE_MESSAGES",
      "kind": "member",
      "title": "&lt;readonly&gt; MIDI_CHANNEL_MODE_MESSAGES :Object.&lt;string, number&gt;",
      "longname": "WebMidi#MIDI_CHANNEL_MODE_MESSAGES",
      "name": "MIDI_CHANNEL_MODE_MESSAGES",
      "tags": "WebMidi#MIDI_CHANNEL_MODE_MESSAGES MIDI_CHANNEL_MODE_MESSAGES",
      "summary": "",
      "description": "Enum of all channel mode messages and their associated numerical value: allsoundoff: 120 resetallcontrollers: 121 localcontrol: 122 allnotesoff: 123 omnimodeoff: 124 omnimodeon: 125 monomodeon: 126 polymodeon: 127"
    },
    "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES": {
      "id": "WebMidi.html#MIDI_CHANNEL_VOICE_MESSAGES",
      "kind": "member",
      "title": "&lt;readonly&gt; MIDI_CHANNEL_VOICE_MESSAGES :Object.&lt;string, number&gt;",
      "longname": "WebMidi#MIDI_CHANNEL_VOICE_MESSAGES",
      "name": "MIDI_CHANNEL_VOICE_MESSAGES",
      "tags": "WebMidi#MIDI_CHANNEL_VOICE_MESSAGES MIDI_CHANNEL_VOICE_MESSAGES",
      "summary": "",
      "description": "Enum of all MIDI channel voice messages and their associated numerical value: noteoff: 0x8 (8) noteon: 0x9 (9) keyaftertouch: 0xA (10) controlchange: 0xB (11) channelmode: 0xB (11) nrpn: 0xB (11) programchange: 0xC (12) channelaftertouch: 0xD (13) pitchbend: 0xE (14)"
    },
    "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES": {
      "id": "WebMidi.html#MIDI_CONTROL_CHANGE_MESSAGES",
      "kind": "member",
      "title": "&lt;readonly&gt; MIDI_CONTROL_CHANGE_MESSAGES :Object.&lt;string, number&gt;",
      "longname": "WebMidi#MIDI_CONTROL_CHANGE_MESSAGES",
      "name": "MIDI_CONTROL_CHANGE_MESSAGES",
      "tags": "WebMidi#MIDI_CONTROL_CHANGE_MESSAGES MIDI_CONTROL_CHANGE_MESSAGES",
      "summary": "",
      "description": "Enum of all control change messages and their associated numerical value: bankselectcoarse: 0 modulationwheelcoarse: 1 breathcontrollercoarse: 2 footcontrollercoarse: 4 portamentotimecoarse: 5 dataentrycoarse: 6 volumecoarse: 7 balancecoarse: 8 pancoarse: 10 expressioncoarse: 11 effectcontrol1coarse: 12 effectcontrol2coarse: 13 generalpurposeslider1: 16 generalpurposeslider2: 17 generalpurposeslider3: 18 generalpurposeslider4: 19 bankselectfine: 32 modulationwheelfine: 33 breathcontrollerfine: 34 footcontrollerfine: 36 portamentotimefine: 37 dataentryfine: 38 volumefine: 39 balancefine: 40 panfine: 42 expressionfine: 43 effectcontrol1fine: 44 effectcontrol2fine: 45 holdpedal: 64 portamento: 65 sustenutopedal: 66 softpedal: 67 legatopedal: 68 hold2pedal: 69 soundvariation: 70 resonance: 71 soundreleasetime: 72 soundattacktime: 73 brightness: 74 soundcontrol6: 75 soundcontrol7: 76 soundcontrol8:`77 soundcontrol9: 78 soundcontrol10: 79 generalpurposebutton1: 80 generalpurposebutton2: 81 generalpurposebutton3: 82 generalpurposebutton4: 83 reverblevel: 91 tremololevel: 92 choruslevel: 93 celestelevel: 94 phaserlevel: 95 databuttonincrement: 96 databuttondecrement: 97 nonregisteredparametercoarse: 98 nonregisteredparameterfine: 99 registeredparametercoarse: 100 registeredparameterfine: 101"
    },
    "WebMidi.html#MIDI_INTERFACE_EVENTS": {
      "id": "WebMidi.html#MIDI_INTERFACE_EVENTS",
      "kind": "member",
      "title": "&lt;readonly&gt; MIDI_INTERFACE_EVENTS :Array.&lt;string&gt;",
      "longname": "WebMidi#MIDI_INTERFACE_EVENTS",
      "name": "MIDI_INTERFACE_EVENTS",
      "tags": "WebMidi#MIDI_INTERFACE_EVENTS MIDI_INTERFACE_EVENTS",
      "summary": "",
      "description": "Array of valid events triggered at the interface level."
    },
    "WebMidi.html#MIDI_NRPN_MESSAGES": {
      "id": "WebMidi.html#MIDI_NRPN_MESSAGES",
      "kind": "member",
      "title": "&lt;readonly&gt; MIDI_NRPN_MESSAGES :Object.&lt;string, number&gt;",
      "longname": "WebMidi#MIDI_NRPN_MESSAGES",
      "name": "MIDI_NRPN_MESSAGES",
      "tags": "WebMidi#MIDI_NRPN_MESSAGES MIDI_NRPN_MESSAGES",
      "summary": "",
      "description": "Enum of all control change messages that are used to create NRPN messages and their associated numerical value: entrymsb: 6 entrylsb: 38 increment: 96 decrement: 97 paramlsb: 98 parammsb: 99 nullactiveparameter: 127"
    },
    "WebMidi.html#MIDI_REGISTERED_PARAMETER": {
      "id": "WebMidi.html#MIDI_REGISTERED_PARAMETER",
      "kind": "member",
      "title": "&lt;readonly&gt; MIDI_REGISTERED_PARAMETER :Object.&lt;string, number&gt;",
      "longname": "WebMidi#MIDI_REGISTERED_PARAMETER",
      "name": "MIDI_REGISTERED_PARAMETER",
      "tags": "WebMidi#MIDI_REGISTERED_PARAMETER MIDI_REGISTERED_PARAMETER",
      "summary": "",
      "description": "Enum of all registered parameters and their associated pair of numerical values. MIDI registered parameters extend the original list of control change messages. Currently, there are only a limited number of them: pitchbendrange: [0x00, 0x00] channelfinetuning: [0x00, 0x01] channelcoarsetuning: [0x00, 0x02] tuningprogram: [0x00, 0x03] tuningbank: [0x00, 0x04] modulationrange: [0x00, 0x05] azimuthangle: [0x3D, 0x00] elevationangle: [0x3D, 0x01] gain: [0x3D, 0x02] distanceratio: [0x3D, 0x03] maximumdistance: [0x3D, 0x04] maximumdistancegain: [0x3D, 0x05] referencedistanceratio: [0x3D, 0x06] panspreadangle: [0x3D, 0x07] rollangle: [0x3D, 0x08]"
    },
    "WebMidi.html#MIDI_SYSTEM_MESSAGES": {
      "id": "WebMidi.html#MIDI_SYSTEM_MESSAGES",
      "kind": "member",
      "title": "&lt;readonly&gt; MIDI_SYSTEM_MESSAGES :Object.&lt;string, number&gt;",
      "longname": "WebMidi#MIDI_SYSTEM_MESSAGES",
      "name": "MIDI_SYSTEM_MESSAGES",
      "tags": "WebMidi#MIDI_SYSTEM_MESSAGES MIDI_SYSTEM_MESSAGES",
      "summary": "",
      "description": "Enum of all valid MIDI system messages and matching numerical values. WebMidi.js also uses two custom messages. System common messages sysex: 0xF0 (240) timecode: 0xF1 (241) songposition: 0xF2 (242) songselect: 0xF3 (243) tuningrequest: 0xF6 (246) sysexend: 0xF7 (247) The sysexend message is never actually received. It simply ends a sysex stream. System real-time messages clock: 0xF8 (248) start: 0xFA (250) continue: 0xFB (251) stop: 0xFC (252) activesensing: 0xFE (254) reset: 0xFF (255) Values 249 and 253 are actually relayed by the Web MIDI API but they do not serve a specific purpose. The MIDI 1.0 spec simply states that they are undefined/reserved. Custom WebMidi.js messages midimessage: 0 unknownsystemmessage: -1"
    },
    "WebMidi.html#NOTES": {
      "id": "WebMidi.html#NOTES",
      "kind": "member",
      "title": "&lt;readonly&gt; NOTES :Array.&lt;string&gt;",
      "longname": "WebMidi#NOTES",
      "name": "NOTES",
      "tags": "WebMidi#NOTES NOTES",
      "summary": "",
      "description": "Array of standard note names"
    },
    "WebMidi.html#octaveOffset": {
      "id": "WebMidi.html#octaveOffset",
      "kind": "member",
      "title": "octaveOffset :number",
      "longname": "WebMidi#octaveOffset",
      "name": "octaveOffset",
      "tags": "WebMidi#octaveOffset octaveOffset",
      "summary": "",
      "description": "An integer to offset the octave both in inbound and outbound messages. By default, middle C (MIDI note number 60) is placed on the 4th octave (C4). If, for example, octaveOffset is set to 2, MIDI note number 60 will be reported as C6. If octaveOffset is set to -1, MIDI note number 60 will be reported as C3."
    },
    "WebMidi.html#outputs": {
      "id": "WebMidi.html#outputs",
      "kind": "member",
      "title": "&lt;readonly&gt; outputs :Array",
      "longname": "WebMidi#outputs",
      "name": "outputs",
      "tags": "WebMidi#outputs outputs",
      "summary": "",
      "description": "An array of all currently available MIDI outputs."
    },
    "WebMidi.html#supported": {
      "id": "WebMidi.html#supported",
      "kind": "member",
      "title": "&lt;readonly&gt; supported :boolean",
      "longname": "WebMidi#supported",
      "name": "supported",
      "tags": "WebMidi#supported supported",
      "summary": "",
      "description": "Indicates whether the environment provides support for the Web MIDI API or not. Note: in environments that do not offer built-in MIDI support, this will report true if the navigator.requestMIDIAccess function is available. For example, if you have installed WebMIDIAPIShim.js but no plugin, this property will be true even though actual support might not be there."
    },
    "WebMidi.html#sysexEnabled": {
      "id": "WebMidi.html#sysexEnabled",
      "kind": "member",
      "title": "&lt;readonly&gt; sysexEnabled :Boolean",
      "longname": "WebMidi#sysexEnabled",
      "name": "sysexEnabled",
      "tags": "WebMidi#sysexEnabled sysexEnabled",
      "summary": "",
      "description": "Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was enabled via the enable() method."
    },
    "WebMidi.html#time": {
      "id": "WebMidi.html#time",
      "kind": "member",
      "title": "&lt;readonly&gt; time :DOMHighResTimeStamp",
      "longname": "WebMidi#time",
      "name": "time",
      "tags": "WebMidi#time time",
      "summary": "",
      "description": "The elapsed time, in milliseconds, since the time origin. Said simply, it is the number of milliseconds that passed since the page was loaded. Being a floating-point number, it has sub-millisecond accuracy. According to the specification, the time should be accurate to 5 µs (microseconds). However, due to various constraints, the browser might only be accurate to one millisecond."
    },
    "WebMidi.html#convertToTimestamp": {
      "id": "WebMidi.html#convertToTimestamp",
      "kind": "function",
      "title": "convertToTimestamp( [ time ] )",
      "longname": "WebMidi#convertToTimestamp",
      "name": "convertToTimestamp",
      "tags": "WebMidi#convertToTimestamp convertToTimestamp",
      "summary": "",
      "description": "Returns a timestamp, relative to the navigation start of the document, derived from the time parameter. If the parameter is a string starting with the \"+\" sign and followed by a number, the resulting value will be the sum of the current timestamp plus that number. Otherwise, the value will be returned as is. If the calculated return value is 0, less than zero or an otherwise invalid value, false will be returned."
    },
    "WebMidi.html#disable": {
      "id": "WebMidi.html#disable",
      "kind": "function",
      "title": "&lt;async&gt; disable() → {Promise.&lt;void&gt;}",
      "longname": "WebMidi#disable",
      "name": "disable",
      "tags": "WebMidi#disable disable",
      "summary": "",
      "description": "Completely disables WebMidi.js by unlinking the MIDI subsystem's interface and destroying all Input and Output objects that may be available. This also means that listeners added to Input objects, Output objects or to WebMidi itself are also destroyed."
    },
    "WebMidi.html#enable": {
      "id": "WebMidi.html#enable",
      "kind": "function",
      "title": "&lt;async&gt; enable( [ options ] ) → {Promise.&lt;Object&gt;}",
      "longname": "WebMidi#enable",
      "name": "enable",
      "tags": "WebMidi#enable enable",
      "summary": "",
      "description": "Checks if the Web MIDI API is available in the current environment and then tries to connect to the host's MIDI subsystem. This is an asynchronous operation and it causes a security prompt to be displayed to the user. To enable the use of MIDI system exclusive messages, the sysex option should be set to true. However, under some environments (e.g. Jazz-Plugin), the sysex option is ignored and system exclusive messages are always enabled. You can check the sysexEnabled property to confirm. To enable access to software synthesizers available on the host, you would set the software option to true. However, this option is only there to future-proof the library as support for software synths has not yet been implemented in any browser (as of April 2020). There are 3 ways to execute code after WebMidi has been enabled: Pass a callback function in the options Listen to the enabled event Wait for the promise to resolve In order, this is what happens towards the end of the enabling process: callback is executed enabled event is triggered connected events from available inputs and outputs are triggered promise is resolved The promise is fulfilled with an object containing two properties (inputs and outputs) that contain arrays of available inputs and outputs, respectively. Important note: starting with Chrome v77, a page using Web MIDI API must be hosted on a secure origin (https://, localhost or file:///) and the user will always be prompted to authorize the operation (no matter if the sysex option is true or not). Examples // Enabling WebMidi and using the promise WebMidi.enable().then(ports =&gt; { console.log(\"WebMidi.js has been enabled!\"); console.log(\"Inputs: \", ports.inputs); console.log(\"Outputs: \", ports.outputs); }) // Enabling WebMidi and listening to 'enabled' event WebMidi.addListener(\"enabled\", e =&gt; { console.log(\"WebMidi.js has been enabled!\"); }); WebMidi.enable(); // Enabling WebMidi and using callback function WebMidi.enable({callback: e =&gt; { console.log(\"WebMidi.js has been enabled!\"); });"
    },
    "WebMidi.html#getInputById": {
      "id": "WebMidi.html#getInputById",
      "kind": "function",
      "title": "getInputById( id ) → {Input|false}",
      "longname": "WebMidi#getInputById",
      "name": "getInputById",
      "tags": "WebMidi#getInputById getInputById",
      "summary": "",
      "description": "Returns the Input object that matches the specified ID string or false if no matching input is found. As per the Web MIDI API specification, IDs are strings (not integers). Please note that IDs change from one host to another. For example, Chrome does not use the same kind of IDs as Jazz-Plugin."
    },
    "WebMidi.html#getInputByName": {
      "id": "WebMidi.html#getInputByName",
      "kind": "function",
      "title": "getInputByName( name ) → {Input|false}",
      "longname": "WebMidi#getInputByName",
      "name": "getInputByName",
      "tags": "WebMidi#getInputByName getInputByName",
      "summary": "",
      "description": "Returns the first Input object whose name contains the specified string. Note that the port names change from one environment to another. For example, Chrome does not report input names in the same way as the Jazz-Plugin does."
    },
    "WebMidi.html#getNoteNumberByName": {
      "id": "WebMidi.html#getNoteNumberByName",
      "kind": "function",
      "title": "getNoteNumberByName( name ) → {number|false}",
      "longname": "WebMidi#getNoteNumberByName",
      "name": "getNoteNumberByName",
      "tags": "WebMidi#getNoteNumberByName getNoteNumberByName",
      "summary": "",
      "description": "Returns a MIDI note number matching the note name passed in the form of a string parameter. The note name must include the octave number. The name can also optionally include a sharp (#), a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid names: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc. When converting note names to numbers, C4 is considered to be middle C (MIDI note number 60) as per the scientific pitch notation standard. The resulting note number is offset by the octaveOffset value (if not zero). For example, if you pass in \"C4\" and the octaveOffset value is 2, the resulting MIDI note number will be 36. Note: since v3.x, this function returns false instead of throwing an error when it cannot parse the name to a number."
    },
    "WebMidi.html#getOctave": {
      "id": "WebMidi.html#getOctave",
      "kind": "function",
      "title": "getOctave( number ) → {number|false}",
      "longname": "WebMidi#getOctave",
      "name": "getOctave",
      "tags": "WebMidi#getOctave getOctave",
      "summary": "",
      "description": "Returns the octave number for the specified MIDI note number (0-127). By default, the value is based on middle C (note number 60) being placed on the 4th octave (C4). However, by using the octaveOffset property, you can offset the result as desired. Note: since v3.x, this method returns false instead of undefined when the value cannot be parsed to a valid octave."
    },
    "WebMidi.html#getOutputById": {
      "id": "WebMidi.html#getOutputById",
      "kind": "function",
      "title": "getOutputById( id ) → {Output|false}",
      "longname": "WebMidi#getOutputById",
      "name": "getOutputById",
      "tags": "WebMidi#getOutputById getOutputById",
      "summary": "",
      "description": "Returns the Output object that matches the specified ID string or false if no matching output is found. As per the Web MIDI API specification, IDs are strings (not integers). Please note that IDs change from one host to another. For example, Chrome does not use the same kind of IDs as Jazz-Plugin."
    },
    "WebMidi.html#getOutputByName": {
      "id": "WebMidi.html#getOutputByName",
      "kind": "function",
      "title": "getOutputByName( name ) → {Output|false}",
      "longname": "WebMidi#getOutputByName",
      "name": "getOutputByName",
      "tags": "WebMidi#getOutputByName getOutputByName",
      "summary": "",
      "description": "Returns the first Output object whose name contains the specified string. Note that the port names change from one environment to another. For example, Chrome does not report input names in the same way as the Jazz-Plugin does."
    },
    "WebMidi.html#guessNoteNumber": {
      "id": "WebMidi.html#guessNoteNumber",
      "kind": "function",
      "title": "guessNoteNumber( input ) → {number|false}",
      "longname": "WebMidi#guessNoteNumber",
      "name": "guessNoteNumber",
      "tags": "WebMidi#guessNoteNumber guessNoteNumber",
      "summary": "",
      "description": "Returns a valid MIDI note number (0-127) given the specified input. The parameter usually is a string containing a note name (C3, F#4, D-2, G8, etc.). If an integer between 0 and 127 is passed, it will simply be returned as is (for convenience). Note: since v3.x, this method returns false instead of throwing an error when the input is invalid."
    },
    "WebMidi.html#sanitizeChannels": {
      "id": "WebMidi.html#sanitizeChannels",
      "kind": "function",
      "title": "sanitizeChannels( [ channel ] ) → {array}",
      "longname": "WebMidi#sanitizeChannels",
      "name": "sanitizeChannels",
      "tags": "WebMidi#sanitizeChannels sanitizeChannels",
      "summary": "",
      "description": "Returns a sanitized array of valid MIDI channel numbers (1-16). The parameter should be one of the following: a single integer an array of integers the special value \"all\" the special value \"none\" Passing \"all\" or undefined as a parameter to this function results in all channels being returned (1-16). Passing \"none\" results in no channel being returned (as an empty array). Note: parameters that cannot successfully be parsed to integers between 1 and 16 are silently ignored."
    }
  }
};