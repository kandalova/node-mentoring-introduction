const { exec } = require('node:child_process');
const os = require('node:os'); 
const fs = require('fs');


function startServer(){
	const commands = {
		win: `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`,
		unix: `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`
	}
	const userOS = os.type();
	const userCommand = userOS==='Windows_NT' ? commands.win : commands.unix;

	let lastMinuteTime = Date.now();
	setInterval(()=>execCommand(), 1000);

	function execCommand(){
		const currentTime = Date.now();
		const isTimeToLog = ((currentTime - lastMinuteTime) / 1000) >= 60;
	
		if (isTimeToLog) {
			lastMinuteTime = currentTime;	
		}
	
		exec(userCommand, (err, stdout, stderr)=>{
			if(err) throw err;
			console.clear();
			console.log(stdout);
	
			if(isTimeToLog){
				const logMsg = `${lastMinuteTime}: ${stdout}\r`;
				fs.appendFile('activityMonitor.log', logMsg, (err) => {
					if (err) throw err;
				});
			}
		})
	}
}

startServer();