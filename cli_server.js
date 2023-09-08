const { exec } = require('node:child_process');
const os = require('node:os'); 

function execCommand(command){

	exec(command, (err, stdout, stderr)=>{
		if(err) throw err;
		console.clear();
		console.log(stdout);
	})
}


function startServer(){
	const commands = {
		win: `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`,
		unix: `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`
	}
	const userOS = os.type();
	const userCommand = userOS==='Windows_NT' ? commands.win : commands.unix;

	setInterval(()=>execCommand(userCommand), 1000);
}

startServer();