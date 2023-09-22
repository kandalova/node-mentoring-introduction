const { exec } = require('node:child_process');
const os = require('node:os'); 
const fs = require('fs');
const readline = require('readline');

const COMMANDS = {
	win: `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`,
	unix: `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`
}


function startServer(){	
	const userOS = os.type();
	const userCommand = userOS==='Windows_NT' ? COMMANDS.win : COMMANDS.unix;

	let lastMinuteTime = Date.now();
	setInterval(()=>execCommand(), 1000);

	function execCommand(){
		const currentTime = Date.now();
		const isTimeToLog = oneMinutePassed(currentTime, lastMinuteTime);
	
		exec(userCommand, (err, stdout, stderr)=>{
			if(err) throw err;
			readline.cursorTo(process.stdout, 0, 0)
 			readline.clearScreenDown(process.stdout)
			process.stdout.write(stdout);

			if(isTimeToLog){
				lastMinuteTime = currentTime;	
				const logMsg = `${lastMinuteTime}: ${stdout}\r`;
				fs.appendFile('activityMonitor.log', logMsg, (err) => {
					if (err) throw err;
				});
			}
		})
	}
}

function oneMinutePassed(currentTime, lastMinuteTime){
	((currentTime - lastMinuteTime) / 1000) >= 60;
}

startServer();