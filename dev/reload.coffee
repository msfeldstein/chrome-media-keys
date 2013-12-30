last_timestamp = null

# ---

reload_interval = () ->
	xhr = new XMLHttpRequest
	
	xhr.open 'GET', 'reload.html'
	xhr.send null
	
	xhr.onload = () ->
		if last_timestamp != xhr.responseText
			last_timestamp = xhr.responseText
			
			do chrome.runtime.reload
			
# ---

do () ->
	xhr = new XMLHttpRequest
	
	xhr.open 'GET', 'reload.html'
	xhr.send null
	
	xhr.onload = () ->
		last_timestamp = xhr.responseText
		
		setInterval reload_interval, 1000
		
