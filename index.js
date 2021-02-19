const btn = document.getElementById("convert-btn");
const downloadBtn = document.getElementById("download-btn");
const resetBtn = document.getElementById("reset-btn");
const textarea = document.getElementById("content");
const fileName = document.getElementById("filename");
let text = "";

/**
 * Handle convert button click
 * Parse JSON object to srt format
 */
btn.onclick = () => {
  text = "";
  let content = textarea.value;
  if (!content) return;
  // Convert string to JSON object
  content = JSON.parse(content);
  // Map body
  content.body.forEach((item, index) => {
    // Get start time
    const from = secToTimer(item.from);
    // Get end time
    const to = secToTimer(item.to);
    // Line
    text += index + 1 + "\n";
    // Time
    text += `${from.replace(".", ",")} --> ${to.replace(".", ",")}\n`;
    // Content
    text += item.content + "\n\n";
  });
  if (text) {
    downloadBtn.disabled = false;
    resetBtn.disabled = false;
    btn.disabled = true;
  }
};

/**
 * Convert second to time stamp
 * @param {*} sec 
 */
function secToTimer(sec) {
  let o = new Date(0);
  let p = new Date(sec * 1000);
  return new Date(p.getTime() - o.getTime())
    .toISOString()
    .split("T")[1]
    .split("Z")[0];
}

/**
 * Handle reset button click
 * Clear all the field
 */
resetBtn.onclick = () => {
  downloadBtn.disabled = true;
  resetBtn.disabled = true;
  btn.disabled = false;
  textarea.value = "";
  fileName.value = "";
  text = "";
};

/**
 * Handle download button click
 */
downloadBtn.onclick = () => {
  if (!fileName.value) return;
  download(`${fileName.value}.srt`, text);
};

/**
 * Download formatted string
 * @param {*} filename 
 * @param {*} content 
 */
function download(filename, content) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
