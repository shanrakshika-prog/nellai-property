const $=s=>document.querySelector(s);
const TXT={brand:["Nellai Property","நெல்லை சொத்து"],post:["+ Post Property","+ சொத்தைப் பதிவிடு"],zero:["✓ 0% Brokerage · Direct Owners","✓ 0% தரகு · நேரடி உரிமையாளர்கள்"],
h1:["Find your dream home, land or flat","உங்கள் கனவு வீடு, நிலம், ஃபிளாட்டைக் கண்டறியுங்கள்"],sub:["Buy, rent or lease directly from owners across Tamil Nadu","தமிழ்நாடு முழுவதும் உரிமையாளரிடமிருந்து நேரடியாக வாங்க, வாடகை, குத்தகை"],
search:["Search by area, city or PIN code…","பகுதி, நகரம் அல்லது அஞ்சல் குறியீடு மூலம் தேடுக…"],s1:["What are you looking for?","நீங்கள் எதைத் தேடுகிறீர்கள்?"],
foot:["© Nellai Property · 0% Brokerage · நெல்லை சொத்து","© நெல்லை சொத்து · 0% தரகு · Nellai Property"],
house:["House","வீடு"],land:["Land","நிலம்"],apartment:["Apartment / Flat","அடுக்குமாடி / ஃபிளாட்"],purchase:["Purchase","வாங்க"],rent:["Rent","வாடகை"],lease:["Lease","குத்தகை"],
direct:["DIRECT OWNER LISTING","உரிமையாளர் நேரடி பதிவு"],ptitle:["Post Your Property with 0% Brokerage","0% தரகுடன் உங்கள் சொத்தைப் பதிவிடுங்கள்"],
step:["Step","படி"],of:["of","/"],back:["← Back","← பின்"],next:["Continue →","தொடர்க →"],pub:["✦ Publish Listing (0% Brokerage)","✦ பதிவை வெளியிடு (0% தரகு)"],
count:["listings","பதிவுகள்"],none:["No listings here yet. Be the first to post!","இங்கு பதிவுகள் இல்லை. முதலில் நீங்கள் பதிவிடுங்கள்!"],
cat:["Property Type *","சொத்து வகை *"],deal:["Deal Type *","பரிவர்த்தனை வகை *"],oname:["Owner Name *","உரிமையாளர் பெயர் *"],phone:["Mobile Number (10 digits) *","கைபேசி எண் (10 இலக்கம்) *"],
city:["City *","நகரம் *"],loc:["Locality / Area *","பகுதி / இடம் *"],addr:["Full Street Address *","முழு முகவரி *"],pin:["PIN Code *","அஞ்சல் குறியீடு *"],lm:["Nearby Landmarks","அருகிலுள்ள அடையாளங்கள்"],
ph_loc:["e.g. Indiranagar, Whitefield","எ.கா. பாளையங்கோட்டை, வண்ணார்பேட்டை"],ph_addr:["Plot / Flat number, building name, road","மனை / பிளாட் எண், கட்டிடப் பெயர், சாலை"],
pr_purchase:["Expected Price (₹) *","எதிர்பார்க்கும் விலை (₹) *"],pr_rent:["Expected Monthly Rent (₹) *","எதிர்பார்க்கும் மாத வாடகை (₹) *"],pr_lease:["Expected Lease Amount (₹) *","எதிர்பார்க்கும் குத்தகைத் தொகை (₹) *"],
dep:["Security Deposit (₹)","முன்பணம் (₹)"],neg:["Price is negotiable for verified long-term tenants","நீண்டகால சரிபார்க்கப்பட்ட குடியிருப்பாளர்களுக்கு விலை பேசலாம்"],negp:["Price is negotiable","விலை பேசித் தீர்மானிக்கலாம்"],
area:["Plot / Built-up Area *","மனை / கட்டிட பரப்பு *"],unit:["Measurement Unit *","அளவீட்டு அலகு *"],sqft:["Square Feet (sq.ft)","சதுர அடி (sq.ft)"],cent:["Cents","சென்ட்"],ground:["Grounds","கிரவுண்ட்"],acre:["Acres","ஏக்கர்"],
dim:["Dimensions (e.g. 40 x 60 ft)","அளவுகள் (எ.கா. 40 x 60 அடி)"],zone:["Permitted Zoning Use","அனுமதிக்கப்பட்ட பயன்பாடு"],ph_zone:["Residential Villa / Commercial / Farming","குடியிருப்பு / வணிகம் / விவசாயம்"],
bhk:["BHK","BHK"],bath:["Bathrooms","குளியலறைகள்"],baths:["Baths","குளியலறை"],furn:["Furnishing","அலங்காரம்"],fu:["Unfurnished","அலங்காரமின்றி"],fs:["Semi-furnished","பகுதி அலங்காரம்"],ff:["Fully furnished","முழு அலங்காரம்"],
face:["Facing Direction","திசை"],N:["North","வடக்கு"],E:["East","கிழக்கு"],W:["West","மேற்கு"],S:["South","தெற்கு"],road:["Road Width (ft)","சாலை அகலம் (அடி)"],
water:["Water Source","தண்ணீர் ஆதாரம்"],elec:["Electricity / Backup","மின்சாரம் / காப்பு"],ph_elec:["3-Phase Industrial / Residential Power","3-பேஸ் தொழில் / குடியிருப்பு மின்சாரம்"],
title:["Listing Title *","பதிவு தலைப்பு *"],ph_title:["e.g. Sunlit 3 BHK Luxury Apartment in Heart of Indiranagar","எ.கா. பாளையங்கோட்டையில் காற்றோட்டமான 3 BHK வீடு"],
desc:["Detailed Description *","விரிவான விளக்கம் *"],ph_desc:["Describe your property, furnishings, ventilation, parking, and proximity to tech parks...","சொத்து, அலங்காரம், காற்றோட்டம், வாகன நிறுத்தம், அருகிலுள்ள இடங்கள் பற்றி விவரிக்கவும்..."],
photo:["Photo URL or Select Demo Preset:","புகைப்பட இணைப்பு அல்லது மாதிரியைத் தேர்ந்தெடுக்கவும்:"],amen:["Select Amenities & Features:","வசதிகளைத் தேர்ந்தெடுக்கவும்:"],
p_apt:["Modern Apartment","நவீன அடுக்குமாடி"],p_villa:["Luxury Villa","சொகுசு வில்லா"],p_off:["Commercial Office","வணிக அலுவலகம்"],p_land:["Land / Farmland","நிலம் / விவசாய நிலம்"],p_shop:["Retail Storefront","சில்லறை கடை"],
req:["Please fill required fields correctly (PIN: 6 digits, Mobile: 10 digits)","தேவையான விவரங்களைச் சரியாக நிரப்பவும் (PIN: 6 இலக்கம், கைபேசி: 10 இலக்கம்)"],
call:["📞 Call broker","📞 தரகரை அழைக்க"],det:["Details →","விவரம் →"],del:["Delete listing","பதிவை நீக்கு"],conf:["Delete this listing?","இந்த பதிவை நீக்கவா?"],mo:["/month","/மாதம்"],owner:["Owner","உரிமையாளர்"],
a_lift:["Lift","மின்தூக்கி"],a_park:["Covered Car Parking","கார் நிறுத்தம்"],a_sec:["24/7 Security","24/7 பாதுகாப்பு"],a_pow:["Power Backup","மின் காப்பு"],a_pool:["Swimming Pool","நீச்சல் குளம்"],a_gym:["Gymnasium","உடற்பயிற்சிக் கூடம்"],a_club:["Club House","கிளப் ஹவுஸ்"],a_bore:["Borewell Water","ஆழ்துளை நீர்"],a_gate:["Gated Community","கேட்டட் சமூகம்"],a_high:["Highway Facing","நெடுஞ்சாலை அருகில்"],a_vis:["Visitor Parking","விருந்தினர் நிறுத்தம்"],a_cctv:["CCTV Surveillance","CCTV கண்காணிப்பு"],a_fence:["Fenced Boundary","வேலி எல்லை"],a_solar:["Solar Water Heating","சூரிய நீர் சூடாக்கி"]};
const AM=["a_lift","a_park","a_sec","a_pow","a_pool","a_gym","a_club","a_bore","a_gate","a_high","a_vis","a_cctv","a_fence","a_solar"];
const U="https://images.unsplash.com/photo-",Q="?auto=format&fit=crop&w=1200&q=80";
const PRE=[["p_apt","1545324418-cc1a3fa10c00"],["p_villa","1613490493576-7fde63acd811"],["p_off","1497366216548-37526070297c"],["p_land","1500382017468-9049fed747ef"],["p_shop","1441986300917-64674bd600d8"]].map(([k,i])=>[k,U+i+Q]);
const CATS={house:"🏠",land:"🌾",apartment:"🏢"},DEALS=["purchase","rent","lease"],KEY="nellai_listings_v2";
let lang=localStorage.lang||"en",cat="house",deal="rent",step=1,form={},view="";
const t=k=>(TXT[k]||[k,k])[lang=="en"?0:1],plain=k=>t(k).replace(/ \*$/,"");
let data=[];
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])),fmt=n=>"₹"+Number(n).toLocaleString("en-IN");
const img=d=>`<div class="im"><span class="badge">${t(d.deal)}</span>${CATS[d.cat]}${d.photo?`<img src="${esc(d.photo)}" alt="" onerror="this.remove()">`:""}<div class="pr">${fmt(d.price)}${d.deal=="rent"?` <small>${t("mo")}</small>`:""}</div></div>`;
function applyLang(){document.documentElement.lang=lang=="en"?"en":"ta";$("#langBtn").textContent=lang=="en"?"தமிழ்":"English";
document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=t(e.dataset.i18n));document.querySelectorAll("[data-i18n-ph]").forEach(e=>e.placeholder=t(e.dataset.i18nPh));
render();if(view=="form"){collect();drawForm()}else if(view)showDetail(view)}
function render(){
$("#cats").innerHTML=Object.keys(CATS).map(c=>`<div class="cat ${c==cat?"on":""}" data-c="${c}"><div class="ic">${CATS[c]}</div><b>${t(c)}</b><small>${data.filter(d=>d.cat==c).length} ${t("count")}</small></div>`).join("");
$("#deals").innerHTML=DEALS.map(d=>`<button class="${d==deal?"on":""}" data-d="${d}">${t(d)}</button>`).join("");
const q=$("#q").value.toLowerCase().trim(),L=data.filter(d=>d.cat==cat&&d.deal==deal&&(!q||[d.loc,d.city,d.pin,d.title,d.addr].join(" ").toLowerCase().includes(q)));
$("#count").textContent=L.length+" "+t("count");
$("#list").innerHTML=L.length?L.map(d=>`<article class="card" data-v="${d.id}">${img(d)}<div class="bd"><h4>${esc(d.title)}</h4>
<div class="loc">📍 ${esc(d.loc)}, ${esc(d.city)} – <b>${esc(d.pin)}</b></div>
<div class="spec"><span>📐 ${d.area} ${t(d.unit)}</span>${d.bhk?`<span>🛏 ${d.bhk} BHK</span>`:""}${d.bath?`<span>🛁 ${d.bath}</span>`:""}</div>
<div class="chips">${(d.am||[]).slice(0,3).map(a=>`<span>${t(a)}</span>`).join("")}</div>
<div class="own"><span><span class="av">${esc(d.owner[0]||"?")}</span>${esc(d.owner)}</span><span class="card-actions">${d.canCallBroker?`<a class="call-broker" href="/api/listings/${d.id}/call" aria-label="${t("call")}" title="${t("call")}">☎</a>`:""}<span class="lnk">${t("det")}</span></span></div></div></article>`).join(""):`<div class="empty">${t("none")}</div>`}
function showDetail(id){const d=data.find(x=>x.id==id);if(!d)return;view=id;
const F=[["addr",d.addr],["pin",d.pin],["lm",d.lm],["dim",d.dim],["zone",d.zone],["furn",d.furn&&t(d.furn)],["face",d.face&&t(d.face)],["road",d.road&&d.road+" ft"],["water",d.water],["elec",d.elec],["dep",d.dep&&fmt(d.dep)]].filter(f=>f[1]);
$("#sheet").innerHTML=`<div class="top"><span class="pill">${t("direct")}</span><button class="x" id="x">✕</button></div><h3>${esc(d.title)}</h3>
<div class="dh im">${img(d).replace('class="im"','').replace(/^<div >/,"<div>")}</div><div class="loc">📍 ${esc(d.loc)}, ${esc(d.city)} – ${esc(d.pin)}${d.neg?" · 🤝 "+t("negp"):""}</div><p>${esc(d.desc)}</p>
<div class="facts">${F.map(f=>`<div><small>${plain(f[0])}</small>${esc(f[1])}</div>`).join("")}</div><div class="chips">${(d.am||[]).map(a=>`<span>✓ ${t(a)}</span>`).join("")}</div>
<div class="dl">${d.canCallBroker?`<a class="btn" href="/api/listings/${d.id}/call" style="text-decoration:none">${t("call")}</a>`:""}${d.mine?`<button class="del" data-del="${d.id}">${t("del")}</button>`:""}</div>`;
$("#modal").classList.remove("hidden")}
const fld=(k,lbl,type="text",ph="")=>`<div class="fld" data-k="${k}"><label>${lbl}</label><input name="${k}" type="${type}" value="${esc(form[k])}" placeholder="${esc(ph)}" ${type=="number"?'min="0"':""}></div>`;
const sel=(k,lbl,o)=>`<div class="fld"><label>${lbl}</label><select name="${k}">${o.map(([v,l])=>`<option value="${v}" ${form[k]==v?"selected":""}>${l}</option>`).join("")}</select></div>`;
function drawForm(){view="form";const isL=form.cat=="land";let h="";
if(step==1)h=`<div class="fld"><label>${t("cat")}</label><div class="opts big">${Object.keys(CATS).map(c=>`<span class="opt ${form.cat==c?"on":""}" data-pick="cat:${c}"><i>${CATS[c]}</i>${t(c)}</span>`).join("")}</div></div>
<div class="fld"><label>${t("deal")}</label><div class="opts big">${DEALS.map(d=>`<span class="opt ${form.deal==d?"on":""}" data-pick="deal:${d}">${t(d)}</span>`).join("")}</div></div><div class="row">${fld("owner",t("oname"),"text","Murugan / முருகன்")}${fld("phone",t("phone"),"tel","98765 43210")}</div>`;
if(step==2)h=`<div class="row">${fld("city",t("city"),"text","Tirunelveli")}${fld("loc",t("loc"),"text",t("ph_loc"))}</div>${fld("addr",t("addr"),"text",t("ph_addr"))}<div class="row">${fld("pin",t("pin"),"text","627002")}${fld("lm",t("lm"),"text","Vannarpettai Bridge (500m), Palayamkottai High School")}</div>`;
if(step==3)h=`<div class="row">${fld("price",t("pr_"+form.deal),"number","35000")}${form.deal!="purchase"?fld("dep",t("dep"),"number","150000"):"<div></div>"}</div>
<label class="chk"><input type="checkbox" name="neg" ${form.neg?"checked":""}>${t(form.deal=="rent"?"neg":"negp")}</label>
<div class="row">${fld("area",t("area"),"number","1800")}${sel("unit",t("unit"),[["sqft",t("sqft")],["cent",t("cent")],["ground",t("ground")],["acre",t("acre")]])}</div>
<div class="row">${fld("dim",t("dim"),"text","40 x 45 ft")}${fld("zone",t("zone"),"text",t("ph_zone"))}</div>
${isL?"":`<div class="row3">${sel("bhk",t("bhk"),[1,2,3,4,5].map(n=>[n,n+" BHK"]))}${sel("bath",t("bath"),[1,2,3,4,5].map(n=>[n,n+" "+t("baths")]))}${sel("furn",t("furn"),[["fu",t("fu")],["fs",t("fs")],["ff",t("ff")]])}</div>`}
<div class="row">${sel("face",t("face"),["N","E","W","S"].map(x=>[x,t(x)]))}${fld("road",t("road"),"number","40")}</div>
<div class="row">${fld("water",t("water"),"text","Thamirabarani River Pipeline + Borewell")}${fld("elec",t("elec"),"text",t("ph_elec"))}</div>`;
if(step==4)h=`${fld("title",t("title"),"text",t("ph_title"))}<div class="fld" data-k="desc"><label>${t("desc")}</label><textarea name="desc" rows="3" placeholder="${esc(t("ph_desc"))}">${esc(form.desc)}</textarea></div>
${fld("photo",t("photo"),"url","https://images.unsplash.com/...")}<div class="opts" style="margin:-4px 0 16px">${PRE.map(([k,u])=>`<span class="opt ${form.photo==u?"on":""}" data-photo="${u}">${t(k)}</span>`).join("")}</div>
<div class="fld"><label>${t("amen")}</label><div class="opts">${AM.map(a=>{const on=(form.am||[]).includes(a);return`<span class="opt ${on?"on":""}" data-am="${a}">${on?"⊙ ":""}${t(a)}</span>`}).join("")}</div></div>`;
$("#sheet").innerHTML=`<div class="top"><span class="pill">${t("direct")}</span><span class="stp">${t("step")} ${step} ${t("of")} 4</span><button class="x" id="x">✕</button></div><h3>${t("ptitle")}</h3><div class="prog"><i style="width:${step*25}%"></i></div>
<form id="f" onsubmit="return false">${h}</form><div class="nav"><button id="back" class="out" style="visibility:${step==1?"hidden":"visible"}">${t("back")}</button><button id="next" class="btn">${t(step==4?"pub":"next")}</button></div>`;
$("#modal").classList.remove("hidden")}
function collect(){document.querySelectorAll("#f [name]").forEach(e=>form[e.name]=e.type=="checkbox"?e.checked:e.value.trim())}
const REQ={1:["cat","deal","owner","phone"],2:["city","loc","addr","pin"],3:["price","area"],4:["title","desc"]};
function valid(){collect();let ok=true;document.querySelectorAll(".err").forEach(e=>e.classList.remove("err"));
REQ[step].forEach(k=>{const v=form[k];let bad=!v;if(k=="pin")bad=!/^[1-9]\d{5}$/.test(v||"");if(k=="phone")bad=!/^[6-9]\d{9}$/.test((v||"").replace(/\s/g,""));
if(bad){ok=false;const el=document.querySelector(`#f [name="${k}"]`);el&&el.parentElement.classList.add("err")}});if(!ok)alert(t("req"));return ok}
const close=()=>{$("#modal").classList.add("hidden");view=""};
document.addEventListener("click",e=>{if(e.target.closest(".call-broker"))return;const x=e.target.closest("[data-c],[data-d],[data-pick],[data-am],[data-photo],[data-del],[data-v],#x,#back,#next");if(!x){if(e.target.id=="modal")close();return}
if(x.id=="x")close();else if(x.dataset.c){cat=x.dataset.c;render()}else if(x.dataset.d){deal=x.dataset.d;render()}else if(x.dataset.v)showDetail(+x.dataset.v);
else if(x.dataset.pick){collect();const[k,v]=x.dataset.pick.split(":");form[k]=v;drawForm()}
else if(x.dataset.photo){collect();form.photo=x.dataset.photo;drawForm()}
else if(x.dataset.am){collect();const a=x.dataset.am,s=form.am||[];form.am=s.includes(a)?s.filter(i=>i!=a):[...s,a];drawForm()}
else if(x.dataset.del){if(confirm(t("conf"))){data=data.filter(d=>d.id!=x.dataset.del);save();close();render()}}
else if(x.id=="back"){collect();step--;drawForm()}
else if(x.id=="next"){if(!valid())return;if(step<4){step++;drawForm();return}
submitListing()}});
$("#q").oninput=render;$("#langBtn").onclick=()=>{lang=lang=="en"?"ta":"en";localStorage.lang=lang;applyLang()};
$("#addBtn").onclick=()=>{form={cat,deal,city:"Tirunelveli",unit:"sqft",bhk:"3",bath:"3",furn:"fs",face:"E",am:["a_lift","a_park","a_sec","a_pow"],photo:PRE[0][1]};step=1;drawForm()};
applyLang();load();

async function load(){try{const r=await fetch("/api/listings");data=await r.json()}catch(e){data=[]}render()}
async function submitListing(){
  const btn=$("#next");btn.disabled=true;
  try{
    const r=await fetch("/api/listings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
    const j=await r.json();if(!r.ok)throw new Error((j.errors||[j.error]).join(", "));
    close();alert(lang=="en"?"✅ Submitted! Your listing will appear on the site after admin approval.":"✅ சமர்ப்பிக்கப்பட்டது! நிர்வாகி ஒப்புதலுக்குப் பிறகு உங்கள் பதிவு தளத்தில் தோன்றும்.");
  }catch(e){alert((lang=="en"?"Could not submit: ":"சமர்ப்பிக்க இயலவில்லை: ")+e.message);btn.disabled=false}
}
