/* eslint-disable react-hooks/exhaustive-deps */
// App.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  StudyFocus English — All-in-one App
  - Intro page (summary)
  - Quiz (main)
  - Mini-games:
      * TypingMiniGame (full mini-game, many words)
      * TypingMiniPenalty (single-word penalty when Quiz wrong)
      * FillBlankMini
      * TranslateMini
      * WordScrambleMini (new fun mini)
  - MINI_TIME set to 10s for typing items (configurable)
  - By K. Nhân × X. Hiền
*/

// ---------- CONFIG ----------
const MINI_TIME = 180; // seconds for typing attempts

const vnVocab = [
["xin chào", "hello"],
["tạm biệt", "goodbye"],
["cảm ơn", "thank you"],
["xin lỗi", "sorry"],
["vui", "happy"],
["buồn", "sad"],
["đẹp", "beautiful"],
["xấu", "ugly"],
["to", "big"],
["nhỏ", "small"],
["mới", "new"],
["cũ", "old"],
["đắt", "expensive"],
["rẻ", "cheap"],
["dễ", "easy"],
["khó", "difficult"],
["nhanh", "fast"],
["chậm", "slow"],
["sạch", "clean"],
["bẩn", "dirty"],["kiến thức", "knowledge"],
["kinh nghiệm", "experience"],
["kỹ năng", "skill"],
["quan điểm", "perspective"],
["niềm tin", "belief"],
["lý do", "reason"],
["giải pháp", "solution"],
["vấn đề", "issue"],
["lợi ích", "benefit"],
["thách thức", "challenge"],
["sáng tạo", "creativity"],
["phân tích", "analysis"],
["đánh giá", "evaluation"],
["kết luận", "conclusion"],
["bằng chứng", "evidence"],
["nghiên cứu", "research"],
["khám phá", "exploration"],
["cơ hội", "opportunity"],
["rủi ro", "risk"],
["kết quả", "outcome"],
["giáo dục", "education"],
["học bổng", "scholarship"],
["bằng cấp", "degree"],
["chứng chỉ", "certificate"],
["học phí", "tuition fee"],
["chuyên ngành", "major"],
["giáo viên", "instructor"],
["học sinh", "student"],
["kỳ thi", "exam"],
["điểm số", "score"],
["bài luận", "essay"],
["kỹ năng mềm", "soft skills"],
["kiến thức", "knowledge"],
["học tập suốt đời", "lifelong learning"],
["thành tích", "achievement"],
["động lực", "motivation"],
["thói quen học tập", "study habit"],
["chương trình giảng dạy", "curriculum"],
["kỷ luật", "discipline"],
["phương pháp học", "learning method"],
["ô nhiễm", "pollution"],
["biến đổi khí hậu", "climate change"],
["rác thải", "waste"],
["tái chế", "recycle"],
["năng lượng tái tạo", "renewable energy"],
["thiên nhiên", "nature"],
["hệ sinh thái", "ecosystem"],
["tài nguyên", "resource"],
["bảo tồn", "conservation"],
["phát triển bền vững", "sustainable development"],
["cộng đồng", "community"],
["tình nguyện viên", "volunteer"],
["công bằng", "fairness"],
["người khuyết tật", "disabled person"],
["bình đẳng giới", "gender equality"],
["phúc lợi xã hội", "social welfare"],
["chính phủ", "government"],
["người dân", "citizen"],
["nghèo đói", "poverty"],
["từ thiện", "charity"],
["đồng ý", "agree"],
["phản đối", "oppose"],
["thừa nhận", "admit"],
["từ chối", "deny"],
["tin tưởng", "believe"],
["nghi ngờ", "doubt"],
["thuyết phục", "persuade"],
["ảnh hưởng", "influence"],
["quyết định", "decide"],
["đề xuất", "suggest"],
["phản ứng", "react"],
["giải quyết", "solve"],
["đối mặt", "face"],
["cải thiện", "improve"],
["phát triển", "develop"],
["thành công", "succeed"],
["thất bại", "fail"],
["tự tin", "confident"],
["lo lắng", "anxious"],
["kiên nhẫn", "patient"],
["tôn trọng", "respect"],
["hợp tác", "cooperate"],
["chia sẻ", "share"],
["giúp đỡ", "assist"],
["phê bình", "criticize"],
["khuyến khích", "encourage"],
["xin lỗi", "apologize"],
["khen ngợi", "compliment"],
["tranh luận", "argue"],
["bày tỏ", "express"],
["thấu hiểu", "understand"],
["giải thích", "explain"],
["hứa", "promise"],
["từ chối", "refuse"],
["thảo luận", "discuss"],
["tin cậy", "trust"],
["xung đột", "conflict"],
["giải pháp", "solution"],
["thỏa hiệp", "compromise"],
["đồng cảm", "empathize"],
["nghề nghiệp", "career"],
["nhân viên", "employee"],
["nhà tuyển dụng", "employer"],
["công ty", "company"],
["văn phòng", "office"],
["làm việc nhóm", "teamwork"],
["lãnh đạo", "leadership"],
["kỹ năng giao tiếp", "communication skill"],
["công việc bán thời gian", "part-time job"],
["thất nghiệp", "unemployment"],
["lương", "salary"],
["thu nhập", "income"],
["kinh nghiệm", "experience"],
["phỏng vấn", "interview"],
["đào tạo", "training"],
["nâng cao", "enhance"],
["hiệu quả", "efficiency"],
["công nghệ", "technology"],
["phần mềm", "software"],
["sáng tạo", "innovation"],
["sức khỏe", "health"],
["bệnh tật", "disease"],
["dinh dưỡng", "nutrition"],
["lối sống", "lifestyle"],
["tập thể dục", "exercise"],
["căng thẳng", "stress"],
["giấc ngủ", "sleep"],
["hạnh phúc", "happiness"],
["thư giãn", "relax"],
["thói quen", "habit"],
["chế độ ăn uống", "diet"],
["bác sĩ", "doctor"],
["bệnh viện", "hospital"],
["thuốc", "medicine"],
["chăm sóc", "take care"],
["đau", "pain"],
["phòng ngừa", "prevent"],
["hồi phục", "recover"],
["mạnh khỏe", "fit"],
["tinh thần", "mental"],
 ["quan trọng","important"],["đáng chú ý","collection"],["đỏ","red"],["xanh dương","blue"],["vàng","yellow"],["xanh lá cây","green"], ["học sinh","student"], ["giáo viên","teacher"],["cam","orange"],["hồng","pink"],["đen","black"],["trắng","white"], ["thư viện","library"], ["bài tập về nhà","homework"],["nâu","brown"],["xám","gray/grey"],["tím","purple"],["gia đình","family"],["bố","father"],["mẹ","mother"],["anh/em trai"," brother"],
  ["kỳ thi","exam"], ["bài kiểm tra","test"], ["trường trung học","high school"], ["sách","book"],["chị/em gái","sister"],["cô","aunt"],["chú/bác","uncle"],["anh/chị/em họ"," cousin"],["đầu","head"],["ngủ","sleep"],
  ["bảng đen","blackboard"], ["bút","pen"], ["bài luận","essay"], ["lớp học","classroom"],
  ["điểm số","score"], ["điểm","mark"], ["bài giảng","lecture"], ["ngôn ngữ","language"]
];

const englishPool = vnVocab.map(x => x[1]).concat([
  'make','have','on','in','at','easy','hard','an','a','the','head','school','teacher','student','study','learn','class','exam','grade','work','play','run','walk','read','write','eat','sleep','blue','black','yellow','black','pink','red','father','mother','sister','brother','head','eye','ear','cousin','uncle','do', 'go', 'be', 'get', 'make', 'have', 'say', 'see', 'put', 'take',
  'give', 'let', 'keep', 'run', 'cut', 'win', 'meet', 'lose', 'send', 'use',
  'find', 'come', 'leave', 'bring', 'build', 'show', 'learn', 'begin', 'draw', 'speak','achieve', 'analyze', 'apply', 'argue', 'assume', 'avoid', 'compare', 'consider', 'convince', 'demonstrate',
  'determine', 'discuss', 'encourage', 'establish', 'explain', 'identify', 'improve', 'influence', 'maintain', 'manage',
  'mention', 'persuade', 'prefer', 'prevent', 'promote', 'realize', 'recognize', 'recommend', 'reduce', 'require',
  'respond', 'solve', 'support', 'suggest', 'succeed', 'supply', 'survive', 'warn', 'increase', 'decrease'
,'anticipate', 'collaborate', 'comprehend', 'contribute', 'coordinate', 'cultivate', 'differentiate', 'elaborate', 'emphasize', 'enhance',
'enforce', 'exhibit', 'exploit', 'formulate', 'implement', 'integrate', 'investigate', 'mitigate', 'navigate', 'negotiate',
'optimize', 'overcome', 'participate', 'perceive', 'prioritize', 'promote', 'reconcile', 'reinforce', 'simulate', 'strategize',
'substantiate', 'synthesize', 'transform', 'validate', 'visualize', 'allocate', 'articulate', 'assess', 'consolidate', 'interpret','good', 'bad', 'new', 'old', 'big', 'small', 'happy', 'sad', 'long', 'short',
'young', 'early', 'late', 'beautiful', 'easy', 'difficult', 'hot', 'cold', 'fast', 'slow',
'strong', 'weak', 'important', 'friendly', 'nice', 'clean', 'simple', 'famous', 'special', 'interesting'
,'air', 'animal', 'beach', 'bird', 'cake', 'chair', 'child', 'clock', 'cloud', 'color',
'day', 'dog', 'eye', 'face', 'field', 'flower', 'foot', 'hand', 'heart', 'hill',
'king', 'letter', 'market', 'moon', 'music', 'night', 'picture', 'road', 'school', 'tree','abroad', 'ahead', 'alone', 'back', 'deep', 'early', 'fast', 'far', 'high', 'inside',
'late', 'near', 'outside', 'quietly', 'right', 'slow', 'there', 'together', 'upstairs', 'downstairs','alive', 'ancient', 'automatic', 'bright', 'calm', 'cheap', 'clear', 'common', 'curly', 'daily',
'dark', 'different', 'easy', 'famous', 'fancy', 'fresh', 'full', 'gentle', 'green', 'happy',
'healthy', 'hungry', 'light', 'modern', 'narrow', 'perfect', 'pleasant', 'polite', 'quick', 'quiet'

]);

const miniPool = [
  "Practice makes perfect.",
  "Never stop learning.",
  "Keep calm and carry on.",
  "Better late than never.",
  "Time is money.",
  "Knowledge is power.",
  "Honesty is the best policy.",
  "Actions speak louder than words.",
  "A journey of a thousand miles begins with a single step.",
  "Don’t count your chickens before they hatch.",
  "Where there is a will, there is a way.",
  "No pain, no gain.",
  "Every cloud has a silver lining.",
  "Rome was not built in a day.",
  "The early bird catches the worm.",
  "When in Rome, do as the Romans do.",
  "You only live once.",
  "Failure is the mother of success.",
  "Hard work beats talent when talent doesn’t work hard.",
  "If you want peace, prepare for war.",
  "Dream big, work hard, stay humble.",
  "Don’t put all your eggs in one basket.",
  "It’s never too late to learn.",
  "Nothing is impossible for a willing heart.",
  "To be or not to be, that is the question.",
  "Life is short, make it sweet.",
  "Success doesn’t come overnight.",
  "A friend in need is a friend indeed.",
  "The pen is mightier than the sword.",
  "Be yourself; everyone else is already taken.",
  " Practice makes perfect. ",
" Effort makes strong. ",
" Study makes knowledgeable. ",
" Patience makes wise. ",
" Honesty makes respected. ",
" Reading makes intelligent. ",
" Failure makes resilient. ",
" Discipline makes successful. ",
" Exercise makes healthy. ",
" Creativity makes innovative. ",
" Experience makes confident. ",
" Curiosity makes clever. ",
" Challenge makes brave. ",
" Observation makes sharp. ",
" Focus makes productive. ",
" Hard work makes capable. ",
" Perseverance makes determined. ",
" Reflection makes thoughtful. ",
" Training makes skilled. ",
" Adventure makes bold. ",
" Observation makes insightful. ",
" Discussion makes articulate. ",
" Research makes thorough. ",
" Analysis makes logical. ",
" Imagination makes creative. ",
" Exploration makes adventurous. ",
" Reflection makes perceptive. ",
" Dedication makes persistent. ",
" Experimentation makes innovative. ",
" Cooperation makes effective. ",
" Motivation makes ambitious. ",
" Criticism makes careful. ",
" Planning makes organized. ",
" Investigation makes curious. ",
" Practice makes accurate. ",
" Problem-solving makes clever. ",
" Experience makes adaptable. ",
" Patience makes enduring. ",
" Learning makes competent. ",
" Focus makes attentive. ",
];

const tenses = [
  {name:'Present Simple', example:'I eat breakfast every day.', answer:'eat'},
  {name:'Present Continuous', example:'I am eating breakfast now.', answer:'am eating'},
  {name:'Present Perfect', example:'I have eaten breakfast.', answer:'have eaten'},
  {name:'Past Simple', example:'I ate breakfast yesterday.', answer:'ate'},
  {name:'Future Simple', example:'I will eat breakfast tomorrow.', answer:'will eat'},
  {name:'Present Simple', example:'She reads a book every night.', answer:'reads'},
{name:'Present Simple', example:'They play football on weekends.', answer:'play'},
{name:'Present Simple', example:'He watches TV after school.', answer:'watches'},
{name:'Present Simple', example:'We study English at school.', answer:'study'},
{name:'Present Simple', example:'The sun rises in the east.', answer:'rises'},
{name:'Present Simple', example:'My dog loves to run in the park.', answer:'loves'},
{name:'Present Simple', example:'I go to bed at 10 p.m.', answer:'go'},
{name:'Present Simple', example:'She drinks coffee every morning.', answer:'drinks'},
{name:'Present Simple', example:'They travel to Europe every summer.', answer:'travel'},
{name:'Present Simple', example:'He works in a bank.', answer:'works'},
{name:'Present Continuous', example:'I am eating breakfast now.', answer:'am eating'},
{name:'Present Continuous', example:'She is reading a strange book in the park.', answer:'is reading'},
{name:'Present Continuous', example:'They are playing football while it is raining.', answer:'are playing'},
{name:'Present Continuous', example:'He is watching TV and laughing loudly.', answer:'is watching'},
{name:'Present Continuous', example:'We are studying English but also listening to music.', answer:'are studying'},
{name:'Present Continuous', example:'My cat is chasing a shadow on the wall.', answer:'is chasing'},
{name:'Present Continuous', example:'I am going to school while eating a sandwich.', answer:'am going'},
{name:'Present Continuous', example:'She is drinking coffee and typing on her laptop.', answer:'is drinking'},
{name:'Present Continuous', example:'They are traveling around the city in a weird car.', answer:'are traveling'},
{name:'Present Continuous', example:'He is working on his project while dancing.', answer:'is working'},
{name:'Present Perfect', example:'I have eaten breakfast already.', answer:'have eaten'},
{name:'Present Perfect', example:'She has finished her homework and spilled coffee.', answer:'has finished'},
{name:'Present Perfect', example:'They have traveled to three countries this year.', answer:'have traveled'},
{name:'Present Perfect', example:'He has watched that movie twice.', answer:'has watched'},
{name:'Present Perfect', example:'We have studied a lot but still feel tired.', answer:'have studied'},
{name:'Present Perfect', example:'My dog has chewed my new shoes.', answer:'has chewed'},
{name:'Present Perfect', example:'I have read this book many times.', answer:'have read'},
{name:'Present Perfect', example:'She has written three emails and forgotten one.', answer:'has written'},
{name:'Present Perfect', example:'They have learned some strange dance moves.', answer:'have learned'},
{name:'Present Perfect', example:'He has broken his phone again.', answer:'has broken'}



];

// sentence pairs for translate mini
const sentencePairs = [
  { vn: "Tôi học tiếng Anh mỗi ngày.", en: "I study English every day." },
  { vn: "Cô ấy đang đọc một cuốn sách.", en: "She is reading a book." },
  { vn: "Chúng tôi sẽ đến trường vào ngày mai.", en: "We will go to school tomorrow." },
  { vn: "Anh ấy đã hoàn thành bài tập về nhà.", en: "He has finished his homework." },
  { vn: "Họ chơi bóng đá vào cuối tuần.", en: "They play football on the weekend." },
  { vn: "Bạn có thể giúp tôi không?", en: "Can you help me?" },
  { vn: "Trời hôm nay rất đẹp.", en: "The weather is very nice today." },
  { vn: "Tôi đã ăn sáng rồi.", en: "I have eaten breakfast." },
  { vn: "Cô giáo giảng bài rất rõ ràng.", en: "The teacher explains the lesson very clearly." },
  { vn: "Hãy giữ bình tĩnh và tiếp tục.", en: "Keep calm and carry on." },
  { vn: "Cô ấy đọc sách vào buổi tối.", en: "She reads a book in the evening." },
{ vn: "Chúng tôi chơi bóng đá vào cuối tuần.", en: "We play football on weekends." },
{ vn: "Anh ấy xem TV sau giờ học.", en: "He watches TV after school." },
{ vn: "Con mèo của tôi đang chạy trong vườn.", en: "My cat is running in the garden." },
{ vn: "Tôi đã ăn sáng rồi.", en: "I have eaten breakfast already." },
{ vn: "Họ đang nghe nhạc trong phòng.", en: "They are listening to music in the room." },
{ vn: "Chúng tôi đã học rất nhiều nhưng vẫn mệt.", en: "We have studied a lot but still feel tired." },
{ vn: "Cô ấy đang uống cà phê và làm việc trên laptop.", en: "She is drinking coffee and working on her laptop." },
{ vn: "Anh ấy đã làm vỡ điện thoại một lần nữa.", en: "He has broken his phone again." },
{ vn: "Họ đã đi du lịch ba quốc gia trong năm nay.", en: "They have traveled to three countries this year." },
{ vn: "Tôi viết nhật ký mỗi buổi sáng.", en: "I write in my diary every morning." },
{ vn: "Cô ấy vẽ tranh trong giờ rảnh.", en: "She paints pictures in her free time." },
{ vn: "Chúng tôi đi dạo công viên sau bữa tối.", en: "We walk in the park after dinner." },
{ vn: "Anh ấy học piano mỗi ngày.", en: "He practices piano every day." },
{ vn: "Con chó đang chơi với quả bóng.", en: "The dog is playing with the ball." },
{ vn: "Tôi đã hoàn thành bài tập về nhà.", en: "I have finished my homework." },
{ vn: "Họ đang chuẩn bị bữa trưa.", en: "They are preparing lunch." },
{ vn: "Cô ấy đã đọc hết cuốn sách này.", en: "She has read this whole book." },
{ vn: "Chúng tôi đang học cách trồng cây.", en: "We are learning how to plant trees." },
{ vn: "Anh ấy đã tham gia một cuộc thi vẽ tranh.", en: "He has joined a painting contest." }


];

// ---------- Typing Word Banks ----------
const typingWordBankShort = [ // for penalty (single items)
  "apple","school","library","homework","exam","computer","pen","book","notebook","pencil","eraser","marker", "highlighter","book","textbook","diary","journal","calculator","ruler", "backpack","folder","paper","scissors","stapler","sharpener","paintbrush", "glue","chalk","computer", "laptop", "tablet", "mouse", "keyboard", "headphones", "printer", "projector", "screen", "camera", "microphone", "speaker", "internet", "router", "USB", "hard drive", "software", "app", "notepad", "cloud","experiment", "analysis", "hypothesis", "observation", "research", "theory", "conclusion", "data", "statistics", "diagram", "equation", "formula", "variable", "measurement", "solution", "method", "process", "procedure", "sample", "result", "discussion", "evidence", "concept", "definition", "principle", "application", "calculation", "prediction", "model", "graph", "function", "component", "structure", "system", "sequence", "element", "technique", "parameter", "comparison", "interpretation"


  
];

const typingWordBankLong = [ // for full mini-game (many words)
  "apple","school","library","homework","exam","computer","pen","book","student","teacher","read","write",
  "study","learn","class","lecture","grade","mark","test","play","run","walk","listen","speak","grammar",
  "vocabulary","sentence","paragraph","compose","practice","review","assignment","project","present","discussion",
  "exercise","practice makes perfect","keep calm and carry on","time management","note taking","revision","exam prep","stay positive and work hard", "believe in yourself and succeed", "keep learning and growing", "smile more and worry less", "dream big and take action", "stay focused and never give up", "be kind and spread love", "think happy and feel good", "stay strong and move forward", "embrace change and enjoy life","focus on goals and achieve them", "stay motivated and keep going", "believe in dreams and pursue them", "stay humble and work hard", "choose joy and spread happiness", "learn from mistakes and improve", "stay curious and explore more", "be brave and take risks", "practice gratitude and stay positive", "shine bright and inspire others"
];

// ---------- UTIL ----------
const shuffle = (a) => {
  const b = a.slice();
  for(let i=b.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [b[i],b[j]] = [b[j],b[i]];
  }
  return b;
};

const genChoices = (correct, pool) => {
  const choices = [correct];
  const poolShuf = shuffle(pool.filter(x=>x!==correct));
  for(let i=0;i<3 && i<poolShuf.length;i++) choices.push(poolShuf[i]);
  return shuffle(choices);
};

function generateQuestions(n){
  const qs=[];
  const usedSet = new Set();
  let i=0;
  while(qs.length<n){
    const mode=i%7;
    let text='',choices=[],answer='';
    switch(mode){
      case 0: {
        const [vn,en] = vnVocab[i%vnVocab.length];
        if(usedSet.has(vn)) { i++; continue; }
        usedSet.add(vn);
        text=`Dịch sang tiếng Anh: "${vn}"`;
        answer=en;
        choices=genChoices(answer, englishPool);
        break;
      }
      case 1: {
        const topic = ['Monday','the morning','Christmas','summer'][i%4];
        if(usedSet.has(topic)){ i++; continue; }
        usedSet.add(topic);
        answer='on';
        choices=genChoices(answer,['in','on','at','by']);
        text=`Chọn giới từ đúng: "They will arrive ___ ${topic}."`;
        break;
      }
      case 2: {
        text=`Hoàn thành câu: "If I ___ more time, I would travel the world."`;
        answer='had';
        choices=genChoices(answer,['have','had','has','having']);
        break;
      }
      case 3: {
        const word = ['honest person','university student','apple'][i%3];
        if(usedSet.has(word)){ i++; continue; }
        usedSet.add(word);
        answer=/^[aeiou]/i.test(word)? 'an':'a';
        choices=genChoices(answer,['a','an','the','--']);
        text=`Chọn mạo từ đúng: "She is ___ ${word}."`;
        break;
      }
      case 4: {
        const word2 = (i%2===0)? 'difficult':'easy';
        if(usedSet.has(word2)){ i++; continue; }
        usedSet.add(word2);
        answer=word2==='difficult'? 'easy':'difficult';
        choices=genChoices(answer,['hard','easy','challenging','tough']);
        text=`Chọn từ trái nghĩa của "${word2}"`;
        break;
      }
      case 5: {
        const topic = ['the evening','next week','my birthday','the weekend'][i % 4];
        if(usedSet.has(topic)){ i++; continue; }
        usedSet.add(topic);
        answer = 'at';
        choices = genChoices(answer, ['in', 'on', 'at', 'by']);
        text = `Chọn giới từ đúng: "She usually studies ___ ${topic}."`;
        break;
    }
    
      case 6: {
        const enWord = englishPool[i%englishPool.length];
        if(usedSet.has(enWord)){ i++; continue; }
        usedSet.add(enWord);
        text=`Chọn từ phù hợp điền vào chỗ trống: "She used a _____ to write."`;
        answer='pen';
        choices=genChoices(answer,['pen','pencil','book','bag']);
        break;
      }
      case 7: {
        const topic = ['Christmas','New Year','Easter','Halloween'][i % 4];
        if(usedSet.has(topic)){ i++; continue; }
        usedSet.add(topic);
        answer = 'at';
        choices = genChoices(answer, ['in','on','at','by']);
        text = `Chọn giới từ đúng: "We usually meet ___ ${topic}."`;
        break;
    }
    
    case 8: {
        const topic = ['Monday','Tuesday','Friday','Sunday'][i % 4];
        if(usedSet.has(topic)){ i++; continue; }
        usedSet.add(topic);
        answer = 'on';
        choices = genChoices(answer, ['in','on','at','by']);
        text = `Chọn giới từ đúng: "I have a meeting ___ ${topic}."`;
        break;
    }
    
    case 9: {
        const topic = ['the morning','the afternoon','the evening','night'][i % 4];
        if(usedSet.has(topic)){ i++; continue; }
        usedSet.add(topic);
        answer = 'in';
        choices = genChoices(answer, ['in','on','at','by']);
        text = `Chọn giới từ đúng: "She usually exercises ___ ${topic}."`;
        break;
    }
    case 9: {
      const enWord = englishPool[i % englishPool.length];
      if(usedSet.has(enWord)){ i++; continue; }
      usedSet.add(enWord);
      text = `Chọn từ phù hợp điền vào chỗ trống: "She is writing with a _____."`;
      answer = 'pencil';
      choices = genChoices(answer, ['pen','pencil','eraser','marker']);
      break;
  }
  
  case 10: {
      const enWord = englishPool[i % englishPool.length];
      if(usedSet.has(enWord)){ i++; continue; }
      usedSet.add(enWord);
      text = `Chọn từ phù hợp điền vào chỗ trống: "He put the papers in a _____."`;
      answer = 'folder';
      choices = genChoices(answer, ['folder','backpack','box','book']);
      break;
  }
  
  case 11: {
      const enWord = englishPool[i % englishPool.length];
      if(usedSet.has(enWord)){ i++; continue; }
      usedSet.add(enWord);
      text = `Chọn từ phù hợp điền vào chỗ trống: "They used a _____ to highlight the important parts."`;
      answer = 'highlighter';
      choices = genChoices(answer, ['pen','highlighter','pencil','marker']);
      break;
  }
  case 12: {
    const enWord = englishPool[i % englishPool.length];
    if(usedSet.has(enWord)){ i++; continue; }
    usedSet.add(enWord);
    text = `Chọn từ phù hợp điền vào chỗ trống: "I need a _____ to measure the length of this table."`;
    answer = 'ruler';
    choices = genChoices(answer, ['ruler','pen','scissors','book']);
    break;
}

case 13: {
    const enWord = englishPool[i % englishPool.length];
    if(usedSet.has(enWord)){ i++; continue; }
    usedSet.add(enWord);
    text = `Chọn từ phù hợp điền vào chỗ trống: "She opened the _____ to find her notes."`;
    answer = 'notebook';
    choices = genChoices(answer, ['notebook','folder','bag','book']);
    break;
}

case 14: {
    const enWord = englishPool[i % englishPool.length];
    if(usedSet.has(enWord)){ i++; continue; }
    usedSet.add(enWord);
    text = `Chọn từ phù hợp điền vào chỗ trống: "He put glue on the paper with a _____."`;
    answer = 'paintbrush';
    choices = genChoices(answer, ['paintbrush','pen','pencil','marker']);
    break;
}
case 15: {
  text = `Hoàn thành câu: "If she ___ harder, she would pass the exam."`;
  answer = 'studied';
  choices = genChoices(answer, ['study','studied','studies','studying']);
  break;
}

case 16: {
  text = `Hoàn thành câu: "If they ___ earlier, they wouldn't have missed the bus."`;
  answer = 'had left';
  choices = genChoices(answer, ['left','had left','leaving','leave']);
  break;
}

case 17: {
  text = `Hoàn thành câu: "If I ___ you, I would take the job offer."`;
  answer = 'were';
  choices = genChoices(answer, ['am','was','were','be']);
  break;
}
case 18: {
  const word = ['engineer','orange','honest man'][i % 3];
  if(usedSet.has(word)){ i++; continue; }
  usedSet.add(word);
  answer = /^[aeiou]/i.test(word) ? 'an' : 'a';
  choices = genChoices(answer, ['a','an','the','--']);
  text = `Chọn mạo từ đúng: "He is ___ ${word}."`;
  break;
}

case 19: {
  const word = ['university','artist','umbrella'][i % 3];
  if(usedSet.has(word)){ i++; continue; }
  usedSet.add(word);
  answer = /^[aeiou]/i.test(word) ? 'an' : 'a';
  choices = genChoices(answer, ['a','an','the','--']);
  text = `Chọn mạo từ đúng: "She has ___ ${word}."`;
  break;
}

case 20: {
  const word = ['apple','teacher','hour'][i % 3];
  if(usedSet.has(word)){ i++; continue; }
  usedSet.add(word);
  answer = /^[aeiou]/i.test(word) ? 'an' : 'a';
  choices = genChoices(answer, ['a','an','the','--']);
  text = `Chọn mạo từ đúng: "I want ___ ${word}."`;
  break;
}

case 21: {
  const word = ['honest student','orange','doctor'][i % 3];
  if(usedSet.has(word)){ i++; continue; }
  usedSet.add(word);
  answer = /^[aeiou]/i.test(word) ? 'an' : 'a';
  choices = genChoices(answer, ['a','an','the','--']);
  text = `Chọn mạo từ đúng: "He is ___ ${word}."`;
  break;
}

case 22: {
  const word = ['engine','artist','ice cream'][i % 3];
  if(usedSet.has(word)){ i++; continue; }
  usedSet.add(word);
  answer = /^[aeiou]/i.test(word) ? 'an' : 'a';
  choices = genChoices(answer, ['a','an','the','--']);
  text = `Chọn mạo từ đúng: "She bought ___ ${word}."`;
  break;
}

case 23: {
  const word = ['university student','egg','honest man'][i % 3];
  if(usedSet.has(word)){ i++; continue; }
  usedSet.add(word);
  answer = /^[aeiou]/i.test(word) ? 'an' : 'a';
  choices = genChoices(answer, ['a','an','the','--']);
  text = `Chọn mạo từ đúng: "He is ___ ${word}."`;
  break;
}



      default: {
        const tense = tenses[i%tenses.length];
        if(usedSet.has(tense.name)){ i++; continue; }
        usedSet.add(tense.name);
        text=`Chọn thì đúng: "${tense.example}" (${tense.name})`;
        answer=tense.answer;
        choices=genChoices(answer,['eat','am eating','have eaten','ate','will eat']);
        break;
      }

    }
    qs.push({id:qs.length+1,text,choices,answer});
    i++;
  }
  return qs;
}

// ---------- APP ----------
export default function App(){
  const [page, setPage] = useState("intro"); // intro | quiz | miniMenu | miniTypingGame | miniTypingPenalty | mini3 | mini4 | mini5
  const [questions] = useState(()=>generateQuestions(200));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  // store which question index caused the typing penalty (when quiz wrong)
  const [pendingWrongIndex, setPendingWrongIndex] = useState(null);
  // when typing penalty succeeds, we set this to the index to reveal when returning to quiz
  const [revealAnswerIndex, setRevealAnswerIndex] = useState(null);

  const goToMini = (num) => {
    // map to pages
    if(num === 1) setPage("miniTypingGame");
    else if(num === 3) setPage("mini3");
    else if(num === 4) setPage("mini4");
    else if(num === 5) setPage("mini5");
    else setPage("miniMenu");
  };

  // start typing penalty from quiz (stores pending wrong)
  function startTypingPenaltyFromQuiz(wrongIndex){
    setPendingWrongIndex(wrongIndex);
    setRevealAnswerIndex(null);
    setPage("miniTypingPenalty");
  }

  // called when TypingPenalty signals success (user typed current item correctly)
  function handleTypingPenaltySuccess(){
    if(pendingWrongIndex !== null){
      setRevealAnswerIndex(pendingWrongIndex);
      setPendingWrongIndex(null);
    }
    setPage("quiz");
  }

  // called when TypingGame (full mini-game) finishes -> go to intro
  function handleTypingGameFinish(){
    setPage("intro");
  }

  return (
    <div style={{minHeight:'100vh',background:'#07101a',color:'#e6eef6',fontFamily:'Inter, system-ui, Arial'}}>
      <AnimatePresence exitBeforeEnter>
        {page === "intro" && (
          <PageWrapper key="intro">
            <Intro onStart={() => setPage("quiz")} onOpenMinis={() => setPage("miniMenu")} />
          </PageWrapper>
        )}

        {page === "quiz" && (
          <PageWrapper key="quiz">
            <QuizPage
              questions={questions}
              index={index}
              setIndex={setIndex}
              score={score}
              setScore={setScore}
              onTriggerPenalty={(wrongIdx) => startTypingPenaltyFromQuiz(wrongIdx)}
              onOpenMiniMenu={()=>setPage("miniMenu")}
              revealAnswerIndex={revealAnswerIndex}
              clearReveal={()=>setRevealAnswerIndex(null)}
            />
          </PageWrapper>
        )}

        {page === "miniMenu" && (
          <PageWrapper key="minimenu">
            <MiniMenu onSelect={(n)=>goToMini(n)} onBack={()=>setPage("intro")} />
          </PageWrapper>
        )}

        {page === "miniTypingGame" && (
          <PageWrapper key="miniTypingGame">
            <TypingMiniGame
              onFinish={() => handleTypingGameFinish()}
            />
          </PageWrapper>
        )}

        {page === "miniTypingPenalty" && (
          <PageWrapper key="miniTypingPenalty">
            <TypingMiniPenalty
              onFinish={() => handleTypingPenaltySuccess()}
            />
          </PageWrapper>
        )}

        {page === "mini3" && (
          <PageWrapper key="mini3">
            <FillBlankMini
              onFinish={() => setPage("intro")}
            />
          </PageWrapper>
        )}

        {page === "mini4" && (
          <PageWrapper key="mini4">
            <TranslateMini
              onFinish={() => setPage("quiz")}
              duration={120}
            />
          </PageWrapper>
        )}

        {page === "mini5" && (
          <PageWrapper key="mini5">
            <WordScrambleMini
              onFinish={() => setPage("intro")}
            />
          </PageWrapper>
        )}
      </AnimatePresence>

      <div style={{position:'fixed',right:12,bottom:10,fontSize:20,opacity:1}}>
        <p style={{marginTop:0,color:'#7dd3fc'}}><b>By Trịnh Khánh Nhân × Đỗ Xuân Hiền</b></p>
      </div>
    </div>
  );
}

// ---------- Page wrapper ----------
function PageWrapper({ children, key }) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 10, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.995 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
      style={{padding:24}}
    >
      {children}
    </motion.div>
  );
}

// ---------- Intro ----------
function Intro({ onStart, onOpenMinis }){
  return (
    <div style={{maxWidth:900, margin:'80px auto 40px', textAlign:'center', transform:'scale(1.05)'}}>
      <motion.h1 initial={{y:-10,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.5}} style={{fontSize:38,color:'#7dd3fc',margin:6}}>🎯 Study English With NxH</motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.15}} style={{maxWidth:760,margin:'14px auto',color:'#cfefff',lineHeight:1.6}}>
       <b> chào mừng đến với ứng dụng luyện tiếng anh cơ bản 
        Vui lòng chọn một chế độ để làm bài test nhanh </b>
      </motion.p>

      <motion.div initial={{scale:0.98,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:.25}} style={{display:'flex',gap:12,justifyContent:'center',marginTop:18}}>
        <button onClick={onStart} style={btnStyle('#34d399')}>🚀 Bắt đầu Quiz</button>
        <button onClick={onOpenMinis} style={btnStyle('#60a5fa')}>🎮 Mini-games</button>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.55}} style={{marginTop:26,display:'flex',justifyContent:'center'}}>
        <div style={{background:'#0b1220',padding:16,borderRadius:12,maxWidth:760,textAlign:'left',boxShadow:'0 8px 30px rgba(0,0,0,0.5)'}}>
          <h3 style={{marginTop:0,color:'#7dd3fc'}}>📘 Note</h3>
          <ul style={{lineHeight:1.7,color:'#e0f2fe'}}>
          <li><strong>Hiện tại đơn (Present Simple):</strong> S + V(s/es) + O → (He plays football.)</li>
<li><strong>Hiện tại hoàn thành (Present Perfect):</strong> S + have/has + V3 + O → (She has finished her homework.)</li>
<li><strong>Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous):</strong> S + have/has been + V-ing + O → (They have been studying all morning.)</li>
<li><strong>Quá khứ đơn (Past Simple):</strong> S + V2 + O → (I went to the park yesterday.)</li>
<li><strong>Quá khứ hoàn thành (Past Perfect):</strong> S + had + V3 + O → (He had left before I arrived.)</li>
<li><strong>Quá khứ tiếp diễn (Past Continuous):</strong> S + was/were + V-ing + O → (She was reading when I called.)</li>
<li><strong>Quá khứ hoàn thành tiếp diễn (Past Perfect Continuous):</strong> S + had been + V-ing + O → (They had been working all day.)</li>
<li><strong>Tương lai đơn (Future Simple):</strong> S + will + V + O → (I will travel tomorrow.)</li>
<li><strong>Tương lai gần (Be going to):</strong> S + am/is/are + going to + V + O → (We are going to watch a movie.)</li>
<li><strong>Tương lai tiếp diễn (Future Continuous):</strong> S + will be + V-ing + O → (He will be studying at 8 p.m.)</li>
<li><strong>Tương lai hoàn thành (Future Perfect):</strong> S + will have + V3 + O → (By next week, I will have finished the project.)</li>
<li><strong>Tương lai hoàn thành tiếp diễn (Future Perfect Continuous):</strong> S + will have been + V-ing + O → (By 5 p.m., she will have been working for 8 hours.)</li>

          </ul>
        </div>
      </motion.div>

    </div>
  );
}

// ---------- Quiz Page ----------
function QuizPage({ questions, index, setIndex, score, setScore, onTriggerPenalty, onOpenMiniMenu, revealAnswerIndex, clearReveal }){
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    if(revealAnswerIndex !== null && revealAnswerIndex === index){
      setShowAnswer(true);
      if(typeof clearReveal === 'function') clearReveal();
      const t = setTimeout(()=> setShowAnswer(false), 3000);
      return ()=>clearTimeout(t);
    }
  }, [revealAnswerIndex, index, clearReveal]);

  function handleChoice(choice){
    const q = questions[index];
    if(choice === q.answer){
      setAnsweredQuestions(prev => [...prev, index]);
      setScore(s => s + 10);
      setIndex(i => Math.min(i + 1, questions.length - 1));
      if (answeredQuestions.length + 1 >= questions.length) {
        alert("Hoàn thành Quiz!");
        if (typeof onOpenMiniMenu === 'function') onOpenMiniMenu('intro');
        return;
      }
      setShowAnswer(false);
    } else {
      // trigger typing penalty (single-word)
      alert("Sai rồi! Bạn sẽ làm Typing hình phạt — gõ đúng 1 lần sẽ quay lại Quiz và hiện đáp án.");
      if(typeof onTriggerPenalty === 'function') onTriggerPenalty(index);
    }
  }

  const q = questions[index];

  return (
    <div style={{maxWidth:900,margin:'30px auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 style={{margin:0,color:'#a7f3d0'}}>Quiz — Điểm: {score}</h2>
        <div>
          <button onClick={()=>onOpenMiniMenu()} style={btnStyle('#f97316')}>Mini-games</button>
          <button onClick={()=>window.location.reload()} style={btnStyle('#94a3b8')}>🏠 Trang chủ</button>
        </div>
      </div>

      <div style={{background:'#0b1320',padding:18,borderRadius:12,marginTop:18}}>
        <div style={{fontSize:18,color:'#e6f7ff'}}>{q.text}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:12}}>
          {q.choices.map((c, idx) => (
            <button key={idx} onClick={()=>handleChoice(c)} style={btnStyle('#3b82f6')}>{c}</button>
          ))}
        </div>
        {showAnswer && <div style={{marginTop:12,color:'#22c55e'}}>✅ Đáp án: <strong>{q.answer}</strong></div>}
        <div style={{display:'flex',justifyContent:'space-between',marginTop:16,gap:8}}>
          <button onClick={()=>{ setIndex(0); setScore(0); }} style={btnStyle('#ef4444')}>🔁 Bắt đầu lại</button>
          <button onClick={()=>setIndex(i=>Math.max(0,i-1))} style={btnStyle('#facc15')}>⬅ Trở lại</button>
          <button onClick={()=>setIndex(i=>Math.min(i+1,questions.length-1))} style={btnStyle('#22d3ee')}>➡ Tiếp</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Mini Menu ----------
function MiniMenu({ onSelect, onBack }){
  return (
    <div style={{maxWidth:900, margin:'80px auto 40px', textAlign:'center', transform:'scale(1.05)'}}>
      <h2 style={{color:'#ffd6a5'}}>Mini-games</h2>
      <p>Chọn một trò chơi để luyện tập kỹ năng khác nhau.</p>
      <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginTop:14}}>
        <div style={miniCardStyle}>
          <h3>1. Typing Challenge (Mini-game)</h3>
          <p>Gõ nhiều từ liên tiếp — luyện tốc độ và chính xác.</p>
          <button onClick={()=>onSelect(1)} style={btnStyle('#34d399')}>Chơi Typing</button>
        </div>

        <div style={miniCardStyle}>
          <h3>2. Fill the Blank 🧩</h3>
          <p>Điền từ thích hợp — kéo thả hoặc chọn.</p>
          <button onClick={()=>onSelect(3)} style={btnStyle('#f472b6')}>Chơi Điền từ</button>
        </div>

        <div style={miniCardStyle}>
          <h3>3. Dịch từ & câu 🔤</h3>
          <p>Dịch từ / câu (VN ↔ EN). Chọn dạng dịch và thử thách tốc độ & chính xác.</p>
          <button onClick={()=>onSelect(4)} style={btnStyle('#f59e0b')}>Chơi Dịch</button>
        </div>

        <div style={miniCardStyle}>
          <h3>4. Word Scramble 🧩✨</h3>
          <p>Ghép chữ hoàn chỉnh từ chữ cái xáo trộn — thử phản xạ từ vựng.</p>
          <button onClick={()=>onSelect(5)} style={btnStyle('#60a5fa')}>Chơi Scramble</button>
        </div>
      </div>

      <div style={{marginTop:20}}>
        <button onClick={onBack} style={btnStyle('#94a3b8')}>Quay lại</button>
        <button onClick={()=>window.location.reload()} style={{...btnStyle('#64748b'),marginLeft:8}}>🏠 Trang chủ</button>
      </div>
    </div>
  );
}

// ---------- Typing Mini (Full Mini-game) ----------
function TypingMiniGame({ onFinish }){
  // Many words; player must type through full list for score
  const [words] = useState(()=>shuffle(typingWordBankLong.slice()));
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(MINI_TIME);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [startedOnce, setStartedOnce] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(()=> {
    // reset when component mounts
    setWordIndex(0);
    setTypedText('');
    setTimeLeft(MINI_TIME);
    setRunning(false);
    setScore(0);
    setStartedOnce(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Robust timer: start/stop based on `running`
  useEffect(() => {
    if(!running){
      if(timerRef.current){ clearInterval(timerRef.current); timerRef.current = null; }
      return;
    }
    // ensure any previous interval cleared
    if(timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if(t <= 1){
          clearInterval(timerRef.current);
          timerRef.current = null;
          setRunning(false);
          // session ends on timeout
          setTimeout(()=> {
            alert(`Hết giờ! Điểm Typing Mini: ${score}. Quay lại màn hình chính.`);
            if(typeof onFinish === 'function') onFinish();
          }, 120);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return ()=> { if(timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  }, [running, score, onFinish]);

  function start(){
    setRunning(true);
    setStartedOnce(true);
    // if timeLeft is 0 (previously ended), reset to full
    setTimeLeft(t => t > 0 ? t : MINI_TIME);
    setTimeout(()=> inputRef.current?.focus(), 80);
  }

  function reset(){
    setWordIndex(0);
    setTypedText('');
    setTimeLeft(MINI_TIME);
    setRunning(false);
    setScore(0);
    setStartedOnce(false);
    if(timerRef.current){ clearInterval(timerRef.current); timerRef.current = null; }
  }

  const norm = s => s.replace(/\s+/g,' ').trim().toLowerCase();

  function handleSubmit(e){
    e && e.preventDefault();
    const target = words[wordIndex] || "";
    if(norm(typedText) === norm(target) && timeLeft > 0){
      setScore(s => s + 10);
      if(wordIndex < words.length - 1){
        setWordIndex(i => i + 1);
        setTypedText('');
        // small boost of time to keep playability but not full reset
        setTimeLeft(t => Math.max(5, t));
        setTimeout(()=> inputRef.current?.focus(), 60);
      } else {
        // finished all words
        setRunning(false);
        alert(`🎉 Hoàn thành Typing Mini! Điểm: ${score + 10}. Quay lại màn hình chính.`);
        if(typeof onFinish === 'function') onFinish();
      }
    } else {
      // wrong
      alert('Hãy nhập lại từ được hiển thị trong thời gian nhất định');
      setTypedText('');
      setTimeout(()=> inputRef.current?.focus(), 80);
    }
  }

  return (
    <div style={{maxWidth:900, margin:'80px auto 40px', textAlign:'center', transform:'scale(1.05)'}}>
      <h3 style={{color:'#ffd166'}}>Typing Mini — Thử thách (Mini-game)</h3>
      <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:8}}>
        <button onClick={()=>window.location.reload()} style={{...btnStyle('#94a3b8')}}>🏠 Trang chủ</button>
      </div>
      <div style={{background:'#041023',padding:18,borderRadius:12}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <div>⏱ Thời gian: <strong>{timeLeft}s</strong></div>
          <div>🎯 Từ: {wordIndex+1}/{words.length}</div>
          <div>⭐ Điểm: {score}</div>
        </div>

        <div style={{padding:14,background:'#021025',borderRadius:10,marginBottom:12}}>
          <div style={{fontSize:18,color:'#cfe8ff'}}>{words[wordIndex]}</div>
        </div>

        <form onSubmit={handleSubmit}>
          <input ref={inputRef} value={typedText} onChange={e=>setTypedText(e.target.value)} disabled={!running}
                 style={{width:'100%',padding:12,borderRadius:8,background:'#001018',color:'#e6f7ff',fontSize:16}} placeholder="Gõ ở đây..." />
          <div style={{display:'flex',justifyContent:'center',gap:10,marginTop:12}}>
            {!running ? (
              <>
                <button type="button" onClick={start} style={btnStyle('#10b981')}>{startedOnce? 'Tiếp tục' : 'Bắt đầu'}</button>
                <button type="button" onClick={reset} style={btnStyle('#f97316')}>Đặt lại</button>
                <button type="button" onClick={()=>{ if(typeof onFinish === 'function') onFinish(); }} style={btnStyle('#64748b')}>Thoát</button>
              </>
            ) : (
              <>
                <button type="submit" style={btnStyle('#3b82f6')}>Nộp</button>
                <button type="button" onClick={reset} style={btnStyle('#f97316')}>Đặt lại</button>
                <button type="button" onClick={()=>{ setRunning(false); alert('Quay lại màn hình chính'); if(typeof onFinish === 'function') onFinish(); }} style={btnStyle('#64748b')}>Thoát</button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------- Typing Mini (Penalty for Quiz) ----------
function TypingMiniPenalty({ onFinish }){
  // Single-word penalty: only need to type current item correctly once to return to quiz
  const [words] = useState(()=>shuffle(typingWordBankShort.slice()));
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(MINI_TIME);
  const [starting, setStarting] = useState(true);
  const [countdown3, setCountdown3] = useState(3);
  const timerRef = useRef(null);

  useEffect(() => {
    const t = setInterval(()=> setCountdown3(c=>c-1), 1000);
    return ()=>clearInterval(t);
  }, []);

  useEffect(()=> {
    if(countdown3 <= 0 && starting) setStarting(false);
  }, [countdown3, starting]);

  useEffect(()=> {
    if(starting) return;
    if(timeLeft > 0){
      timerRef.current = setTimeout(()=>setTimeLeft(t=>t-1),1000);
    } else {
      // timeout: let user retry same word or skip
      alert('Hết giờ cho thử thách phạt. Bạn có thể thử lại hoặc bỏ qua về Quiz.');
      setTimeLeft(MINI_TIME);
      setTypedText('');
      setStarting(false);
    }
    return ()=>clearTimeout(timerRef.current);
  }, [timeLeft, starting]);

  const norm = s => s.replace(/\s+/g,' ').trim().toLowerCase();

  function handleSubmit(e){
    e && e.preventDefault();
    const target = words[wordIndex];
    if(norm(typedText) === norm(target) && timeLeft > 0){
      alert('🎉 Gõ đúng! Quay lại Quiz và sẽ hiển thị đáp án câu sai.');
      if(typeof onFinish === 'function') onFinish();
    } else {
      alert('❌ Sai! Thử lại từ này để quay lại Quiz.');
      setTypedText('');
      setTimeLeft(MINI_TIME);
      setStarting(false);
    }
  }

  return (
    <div style={{maxWidth:900, margin:'80px auto 40px', textAlign:'center', transform:'scale(1.05)'}}>
      <motion.div initial={{scale:.98,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.35}} style={{background:'#041023',padding:20,borderRadius:12}}>
        <h3 style={{color:'#ffd166',marginTop:0}}>Typing Penalty — Hình phạt Quiz</h3>
        <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:8}}>
          <button onClick={()=>window.location.reload()} style={{...btnStyle('#94a3b8')}}>🏠 Trang chủ</button>
          <button onClick={()=>{ alert('Bỏ qua phạt — trở về Quiz'); if(typeof onFinish === 'function') onFinish(); }} style={btnStyle('#64748b')}>Bỏ qua → Quiz</button>
        </div>

        {starting ? (
          <div style={{padding:30}}>
            <p style={{fontSize:22}}>Chuẩn bị...</p>
            <div style={{fontSize:46,fontWeight:'bold',color:'#93c5fd'}}>{countdown3 > 0 ? countdown3 : "Go!"}</div>
          </div>
        ) : (
          <>
            <p style={{opacity:0.9}}>⏱ Còn lại: <strong>{timeLeft}s</strong></p>
            <p style={{fontStyle:'italic',color:'#c7d2fe',padding:10,background:'#021025',borderRadius:8}}>{words[wordIndex]}</p>
            <form onSubmit={handleSubmit}>
              <textarea value={typedText} onChange={e=>setTypedText(e.target.value)} rows={2} style={{width:'100%',padding:10,borderRadius:8,background:'#001018',color:'#e6f7ff'}} />
              <div style={{display:'flex',justifyContent:'center',gap:8,marginTop:10}}>
                <button type="submit" style={btnStyle('#10b981')}>Nộp</button>
                <button type="button" onClick={()=>{ setTypedText(''); setTimeLeft(MINI_TIME); setStarting(false); }} style={btnStyle('#f97316')}>Thử lại</button>
                <button type="button" onClick={()=>{ alert('Bỏ qua phạt — trở về Quiz'); if(typeof onFinish === 'function') onFinish(); }} style={btnStyle('#64748b')}>Bỏ qua → Quiz</button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

// ---------- Fill Blank Mini (Mini 3) ----------
function FillBlankMini({ onFinish }){
  const bankSentences = [
    {text: "He ___ football on Sundays.", answer: "plays", opts: ["play","plays","playing","played"]},
{text: "They ___ breakfast at 7 a.m.", answer: "eat", opts: ["eat","eats","eating","ate"]},
{text: "She ___ a book every night.", answer: "reads", opts: ["read","reads","reading","readed"]},
{text: "I ___ to the park every weekend.", answer: "go", opts: ["go","goes","going","went"]},
{text: "He ___ TV after school.", answer: "watches", opts: ["watch","watches","watching","watched"]},
{text: "We ___ English at school.", answer: "study", opts: ["study","studies","studying","studied"]},
{text: "My dog ___ in the garden every morning.", answer: "runs", opts: ["run","runs","running","ran"]},
{text: "She ___ coffee every morning.", answer: "drinks", opts: ["drink","drinks","drinking","drank"]},
{text: "They ___ to Europe every summer.", answer: "travel", opts: ["travel","travels","traveling","traveled"]},
{text: "He ___ in a bank.", answer: "works", opts: ["work","works","working","worked"]},
{text: "I ___ breakfast right now.", answer: "am eating", opts: ["eat","eats","am eating","eating"]},
{text: "She ___ in the park at the moment.", answer: "is running", opts: ["runs","is running","running","ran"]},
{text: "They ___ a new project this week.", answer: "are working on", opts: ["work on","works on","are working on","worked on"]},
{text: "He ___ his homework every day.", answer: "does", opts: ["do","does","doing","did"]},
{text: "We ___ to the gym twice a week.", answer: "go", opts: ["go","goes","going","went"]},
{text: "My brother ___ a song now.", answer: "is singing", opts: ["sings","is singing","singing","sang"]},
{text: "I ___ English for three years.", answer: "have studied", opts: ["study","studies","have studied","studied"]},
{text: "She ___ a letter at the moment.", answer: "is writing", opts: ["writes","is writing","writing","wrote"]},
{text: "They ___ football every Saturday.", answer: "play", opts: ["play","plays","playing","played"]},
{text: "He ___ very fast.", answer: "runs", opts: ["run","runs","running","ran"]},
{text: "She ___ very happy today.", answer: "is", opts: ["is","are","am","be"]},
{text: "I ___ my homework yesterday.", answer: "did", opts: ["do","does","did","doing"]},
{text: "They ___ to the library every week.", answer: "go", opts: ["go","goes","going","went"]},
{text: "He ___ lunch at the moment.", answer: "is having", opts: ["has","is having","have","having"]},
{text: "We ___ in this city since 2010.", answer: "have lived", opts: ["live","lived","have lived","living"]},
{text: "My sister ___ TV when I called.", answer: "was watching", opts: ["watched","was watching","is watching","watches"]},
{text: "I ___ never seen such a beautiful place.", answer: "have", opts: ["have","has","had","having"]},
{text: "They ___ playing football when it started raining.", answer: "were", opts: ["was","were","are","is"]},
{text: "He ___ a new car next month.", answer: "will buy", opts: ["buys","will buy","buy","is buying"]},
{text: "We ___ dinner at 7 p.m. every day.", answer: "have", opts: ["have","has","had","having"]},
    {text: "She ___ to school every day.", answer: "goes", opts: ["go","goes","going","gone"]},
    {text: "They ___ lunch at noon.", answer: "have", opts: ["has","have","had","having"]},
    {text: "I ___ a book yesterday.", answer: "read", opts: ["read","reads","will read","reading"]},
    {text: "He ___ his homework before class.", answer: "finished", opts: ["finish","finishes","finished","finishing"]},
    {text: "We ___ to the park tomorrow.", answer: "will go", opts: ["go","went","will go","going"]}
  ];

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);

  function handleChoose(opt){
    setSelected(opt);
    setShowHint(false);
  }

  function handleSubmit(){
    const cur = bankSentences[idx];
    if(selected === null){
      setShowHint(true);
      return;
    }
    if(selected === cur.answer){
      setScore(s=>s+10);
      alert('✅ Đúng rồi!');
      setSelected(null);
      setShowHint(false);
      setIdx(i => {
        if(i >= bankSentences.length-1){
          alert(`Hoàn thành! Điểm mini này: ${score + 10}. Quay lại màn hình chính.`);
          if(typeof onFinish === 'function') onFinish();
          return 0;
        }
        return i+1;
      });
    } else {
      alert(`❌ Sai rồi! Câu đúng là: "${cur.answer}"`);
      setSelected(null);
      setShowHint(false);
      setIdx(i => {
        if(i >= bankSentences.length-1){
          alert(`Hoàn thành! Điểm mini này: ${score}. Quay lại màn hình chính.`);
          if(typeof onFinish === 'function') onFinish();
          return 0;
        }
        return i+1;
      });
    }
  }

  const cur = bankSentences[idx];

  return (
    <div style={{maxWidth:900, margin:'80px auto 40px', textAlign:'center', transform:'scale(1.05)'}}>
      <h3 style={{color:'#ffd166'}}>Mini 3 — Fill the Blank 🧩</h3>
      <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:8}}>
        <button onClick={()=>window.location.reload()} style={{...btnStyle('#94a3b8')}}>🏠 Trang chủ</button>
      </div>
      <div style={{background:'#021426',padding:18,borderRadius:12}}>
        <p style={{fontSize:18,color:'#e6f7ff'}}>{cur.text.replace(cur.answer, "_____")}</p>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap',marginTop:8}}>
          {cur.opts.map((o, i) => (
            <button
              key={i}
              onClick={()=>handleChoose(o)}
              style={{
                ...btnStyle(selected === o ? '#60a5fa' : '#3b82f6'),
                minWidth:100
              }}
            >
              {o}
            </button>
          ))}
        </div>
        {showHint && <p style={{color:'#ffd166',marginTop:12}}>Gợi ý: kiểm tra thì của câu và chia động từ phù hợp.</p>}
        <div style={{display:'flex',justifyContent:'center',gap:10,marginTop:12}}>
          <button onClick={handleSubmit} style={btnStyle('#10b981')}>Nộp</button>
          <button onClick={()=>{ setSelected(null); setShowHint(false); }} style={btnStyle('#64748b')}>Đặt lại</button>
          <button onClick={()=>{ if(typeof onFinish === 'function') onFinish(); }} style={btnStyle('#6b7280')}>Quay lại</button>
        </div>
        <p style={{marginTop:14,opacity:0.85}}>Điểm mini: {score}</p>
      </div>
    </div>
  );
}

// ---------- Translate Mini (Mini 4) ----------
function TranslateMini({ onFinish, duration = 120 }){
  const [mode, setMode] = useState('word'); // 'word' | 'sentence' | 'reverse'
  const [rounds, setRounds] = useState(5);
  const [curRound, setCurRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [score, setScore] = useState(0);
  const [promptItem, setPromptItem] = useState(() => ({type:'word', from:'vn', text: vnVocab[Math.floor(Math.random()*vnVocab.length)][0], answer: vnVocab[Math.floor(Math.random()*vnVocab.length)][1]}));
  const [input, setInput] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    setCurRound(1);
    setScore(0);
    setTimeLeft(duration);
    pickPrompt(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if(timeLeft <= 0){
      finishSession();
      return;
    }
    timerRef.current = setTimeout(()=> setTimeLeft(t => t-1), 1000);
    return ()=> clearTimeout(timerRef.current);
  }, [timeLeft]);

  function pickPrompt(m){
    if(m === 'word'){
      const pair = vnVocab[Math.floor(Math.random()*vnVocab.length)];
      setPromptItem({type:'word', from:'vn', text: pair[0], answer: pair[1]});
      setInput('');
      return;
    }
    if(m === 'reverse'){
      const pair = vnVocab[Math.floor(Math.random()*vnVocab.length)];
      setPromptItem({type:'word', from:'en', text: pair[1], answer: pair[0]});
      setInput('');
      return;
    }
    const pair = sentencePairs[Math.floor(Math.random()*sentencePairs.length)];
    setPromptItem({type:'sentence', from:'vn', text: pair.vn, answer: pair.en});
    setInput('');
  }

  function norm(s){ return s.replace(/\s+/g,' ').trim().toLowerCase(); }

  function submitAnswer(){
    if(!input.trim()){
      alert('Vui lòng nhập câu dịch trước khi nộp.');
      return;
    }
    const correct = norm(promptItem.answer);
    const user = norm(input);
    if(user === correct || similarityByWords(user, correct) >= 0.65){
      setScore(s => s + (promptItem.type === 'sentence' ? 20 : 10));
      alert('✅ bạn nhỏ làm đúng rồi hihi!');
    } else {
      setScore(s => Math.max(0, s - (promptItem.type === 'sentence' ? 5 : 3)));
      alert(`❌ Sai rồi huhu! Đáp án đúng là : "${promptItem.answer}"`);
    }
    if(curRound >= rounds){
      finishSession();
    } else {
      setCurRound(r => r+1);
      pickPrompt(mode);
    }
  }

  function similarityByWords(a,b){
    const A = a.split(' ').filter(Boolean);
    const B = b.split(' ').filter(Boolean);
    const inter = A.filter(x=>B.includes(x)).length;
    const union = new Set([...A,...B]).size || 1;
    return inter/union;
  }

  function finishSession(){
    setTimeout(()=> {
      alert(`Mini Dịch kết thúc! Điểm: ${score}. Quay lại Quiz, chiến tiếp nào!`);
      onFinish();
    }, 200);
  }

  return (
    <div style={{maxWidth:900, margin:'80px auto 40px', textAlign:'center', transform:'scale(1.05)'}}>
      <h3 style={{color:'#ffd166'}}>Mini 4 — Dịch từ & câu 🔤</h3>
      <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:8}}>
        <button onClick={()=>window.location.reload()} style={{...btnStyle('#94a3b8')}}>🏠 Trang chủ</button>
      </div>
      <div style={{background:'#021426',padding:18,borderRadius:12}}>
        <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:12}}>
          <button onClick={()=>setMode('word')} style={btnStyle(mode==='word' ? '#60a5fa' : '#3b82f6')}>VN → EN (Từ)</button>
          <button onClick={()=>setMode('sentence')} style={btnStyle(mode==='sentence' ? '#60a5fa' : '#3b82f6')}>VN → EN (Câu)</button>
          <button onClick={()=>setMode('reverse')} style={btnStyle(mode==='reverse' ? '#60a5fa' : '#3b82f6')}>EN → VN</button>
        </div>

        <div style={{textAlign:'left',margin:'8px 0 12px 0'}}>
          <div style={{opacity:0.9}}>⏱ Thời gian còn lại: <strong>{timeLeft}s</strong> — Vòng: {curRound}/{rounds} — Điểm: {score}</div>
        </div>

        <div style={{padding:14,background:'#01121a',borderRadius:8,marginBottom:10}}>
          <div style={{color:'#9ae6b4',fontSize:16}}>
            {promptItem.from === 'vn' ? `Dịch sang tiếng Anh:` : `Dịch sang tiếng Việt:`}
          </div>
          <div style={{fontSize:20,color:'#e6f7ff',marginTop:6}}>{promptItem.text}</div>
        </div>

        <textarea value={input} onChange={e=>setInput(e.target.value)} rows={4} style={{width:'100%',padding:12,borderRadius:8,background:'#001018',color:'#e6f7ff'}} placeholder="Nhập bản dịch của bạn ở đây..." />

        <div style={{display:'flex',justifyContent:'center',gap:10,marginTop:12}}>
          <button onClick={submitAnswer} style={btnStyle('#10b981')}>Nộp</button>
          <button onClick={()=>{ setInput(''); }} style={btnStyle('#64748b')}>Đặt lại</button>
          <button onClick={()=>{ pickPrompt(mode); setInput(''); }} style={btnStyle('#f97316')}>Đổi đề</button>
        </div>

        <p style={{marginTop:12,opacity:0.85,fontSize:13}}>Gợi ý: tập trung vào ý chính, dùng cấu trúc ngữ pháp đơn giản, không cần hoàn toàn giống câu mẫu miễn đảm bảo ý đúng.</p>
      </div>
    </div>
  );
}

// ---------- Word Scramble Mini (Mini 5) ----------
function WordScrambleMini({ onFinish }) {
  // New fun mini: scramble words -> player must type unscrambled
  const [pool] = useState(() => shuffle(typingWordBankLong.slice()));
  const [idx, setIdx] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const timerRef = useRef(null);

  useEffect(()=> {
    setIdx(0);
    setScore(0);
    setTimeLeft(90);
    pickScramble(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=> {
    if(timeLeft <= 0){
      clearInterval(timerRef.current);
      alert(`Hết giờ rồi! Điểm Scramble: ${score}. Quay lại màn hình chính.`);
      if(typeof onFinish === 'function') onFinish();
      return;
    }
    timerRef.current = setTimeout(()=> setTimeLeft(t => t-1), 1000);
    return ()=> clearTimeout(timerRef.current);
  }, [timeLeft, score, onFinish]);

  function scrambleWord(w){
    const arr = w.split('');
    // For multi-word phrases keep spaces in place but shuffle letters of whole phrase
    const letters = arr.filter(ch => ch !== ' ');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    // reinsert spaces at original indices
    const res = [];
    let li = 0;
    arr.forEach(ch => {
      if(ch === ' '){
        res.push(' ');
      } else {
        res.push(letters[li++] || '');
      }
    });
    return res.join('');
  }

  function pickScramble(i){
    const w = pool[i] || pool[0];
    setScrambled(scrambleWord(w));
    setInput('');
  }

  function submit(){
    const target = pool[idx] || '';
    if(input.trim().toLowerCase() === target.trim().toLowerCase()){
      setScore(s => s + 10);
      alert('✅ Chính xác!');
      if(idx >= pool.length - 1){
        alert(`Hoàn thành Scramble! Điểm: ${score + 10}. Quay lại màn hình chính.`);
        if(typeof onFinish === 'function') onFinish();
      } else {
        setIdx(i => i + 1);
        pickScramble(idx + 1);
      }
    } else {
      alert('❌ Sai! Thử lại hoặc bỏ qua.');
      setInput('');
    }
  }

  function skip(){
    if(idx >= pool.length - 1){
      alert(`Kết thúc Scramble. Điểm: ${score}. Quay lại màn hình chính.`);
      if(typeof onFinish === 'function') onFinish();
    } else {
      setIdx(i => i + 1);
      pickScramble(idx + 1);
    }
  }

  return (
    <div style={{maxWidth:900, margin:'80px auto 40px', textAlign:'center', transform:'scale(1.05)'}}>
      <h3 style={{color:'#ffd166'}}>Word Scramble — Mini vui</h3>
      <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:8}}>
        <button onClick={()=>window.location.reload()} style={{...btnStyle('#94a3b8')}}>🏠 Trang chủ</button>
      </div>
      <div style={{background:'#071022',padding:18,borderRadius:12}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
          <div>⏱ {timeLeft}s</div>
          <div>Từ: {idx+1}/{pool.length}</div>
          <div>Điểm: {score}</div>
        </div>
        <div style={{padding:20,background:'#021025',borderRadius:8,marginBottom:12,fontSize:20,color:'#cfe8ff'}}>
          {scrambled}
        </div>
        <div>
          <input value={input} onChange={e=>setInput(e.target.value)} style={{width:'100%',padding:10,borderRadius:8,background:'#001018',color:'#e6f7ff'}} placeholder="Gõ từ đúng vào đây..." />
          <div style={{display:'flex',justifyContent:'center',gap:10,marginTop:12}}>
            <button onClick={submit} style={btnStyle('#10b981')}>Nộp</button>
            <button onClick={skip} style={btnStyle('#f97316')}>Bỏ qua</button>
            <button onClick={()=>{ alert('Thoát Scramble.'); if(typeof onFinish === 'function') onFinish(); }} style={btnStyle('#64748b')}>Thoát</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Styles ----------
const btnStyle = (bg) => ({
  padding:'10px 14px',
  borderRadius:10,
  background:bg,
  color:'#fff',
  border:'none',
  cursor:'pointer',
  fontWeight:'600',
  boxShadow:'0 6px 18px rgba(0,0,0,0.45)'
});

const miniCardStyle = {
  background:'#071021',
  padding:16,
  borderRadius:12,
  width:240,
  textAlign:'left',
  boxShadow:'0 10px 30px rgba(0,0,0,0.6)'
};

