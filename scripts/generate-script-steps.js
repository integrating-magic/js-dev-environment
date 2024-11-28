const { exec, spawn } = require("child_process");

function pbcopy(data) {
  const proc = spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}

function convertClipboardToFM() {
  exec(
    "osascript -e 'set the clipboard to (do shell script \"pbpaste\" as «class XMSS»)'",
    (error) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
    }
  );
}

const xml = `<fmxmlsnippet type="FMObjectList"><Step enable="True" id="141" name="Set Variable"><Value><Calculation><![CDATA[JSONGetElement ( Get ( ScriptParameter ) ; "callbackName" )]]></Calculation></Value><Repetition><Calculation><![CDATA[1]]></Calculation></Repetition><Name>$callbackName</Name></Step><Step enable="True" id="141" name="Set Variable"><Value><Calculation><![CDATA[JSONGetElement ( Get ( ScriptParameter ) ; "promiseID" )]]></Calculation></Value><Repetition><Calculation><![CDATA[1]]></Calculation></Repetition><Name>$promiseID</Name></Step><Step enable="True" id="141" name="Set Variable"><Value><Calculation><![CDATA[JSONGetElement ( Get ( ScriptParameter ) ; "parameter" )]]></Calculation></Value><Repetition><Calculation><![CDATA[1]]></Calculation></Repetition><Name>$parameter</Name></Step><Step enable="True" id="89" name="# (comment)"></Step><Step enable="True" id="89" name="# (comment)"><Text>Your logic here</Text></Step><Step enable="True" id="89" name="# (comment)"></Step><Step enable="True" id="141" name="Set Variable"><Value><Calculation><![CDATA["web"]]></Calculation></Value><Repetition><Calculation><![CDATA[1]]></Calculation></Repetition><Name>$webviewer</Name></Step><Step enable="True" id="175" name="Perform JavaScript in Web Viewer"><ObjectName><Calculation><![CDATA[$webviewer]]></Calculation></ObjectName><FunctionName><Calculation><![CDATA[$callbackName]]></Calculation></FunctionName><Parameters Count="1"><P><Calculation><![CDATA[$promiseID]]></Calculation></P></Parameters></Step></fmxmlsnippet>`;

pbcopy(xml);
console.log("\x1b[34mXML copied to clipboard.\x1b[0m");
convertClipboardToFM();
console.log(
  "\x1b[32mConverted to script steps. Go paste it in your FM script!\x1b[0m"
);
