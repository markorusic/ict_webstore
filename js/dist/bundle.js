!function(e){function i(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}var a={};i.m=e,i.c=a,i.d=function(e,a,n){i.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:n})},i.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(a,"a",a),a},i.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},i.p="",i(i.s=3)}([function(e,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(){function e(){n=""==location.search?[]:location.search.slice(1).split("&").map(function(e){return{key:e.split("=")[0],value:e.split("=")[1]}})}function i(){return(n.length>0?"?":"")+n.map(function(e){return e.key+"="+e.value}).join("&")}function a(){window.history.pushState("","",location.pathname+i())}var n=null;return{getParam:function(i){e();var a=n.find(function(e){return e.key==i});return a?a.value:null},setParam:function(i,t){e();var o=!1;n=n.map(function(e){return e.key==i&&(e.value=t,o=!0),e}),o||n.push({key:i,value:t}),a()},removeParam:function(i){e(),n=n.filter(function(e){return e.key!=i}),a()}}}()},function(e,i,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(i,"__esModule",{value:!0});var t=a(2),o=n(t),r=a(7),s=n(r),l=a(0),c=n(l);i.default=function(){function e(e,i,a){a.preventDefault(),a.stopPropagation(),o.default.add(e),i&&i.tooltip("show")}function i(e,i){i.preventDefault(),i.stopPropagation(),o.default.remove(e)}function a(e,i){i&&i.preventDefault(),$("body").css("overflow","hidden").append(s.default.articleModal(e)),l=$("#article-photo-modal"),l.show(),t(e),c.default.setParam("articleId",e.id)}function n(e){e.preventDefault(),l.remove(),l=null,$("body").css("overflow-y","scroll"),c.default.removeParam("articleId")}function t(i){l.children().on("click",function(e){return e.stopPropagation()}),l.find(".fa-times").on("click",n),l.on("click",n),l.find(".add-to-cart").on("click",e.bind(this,i,l.find(".add-to-cart")))}var r=null,l=null,u=null,d=null;return{init:function(e,i,a,n){d=a,this.setArticle(e),this.render(i,n),u=d.children().last(),this.bindEvents(e,i)},render:function(e,i){var a="";"box-view"==e?a=s.default.article(r):"table-view"==e?a=s.default.articleTr(r,i):"popover-table-view"==e&&(a=s.default.articleTrPopover(r,i)),d.append(a)},getArticle:function(){return r},setArticle:function(e){r=e},showArticle:function(e){a(e)},bindEvents:function(n,t){"box-view"==t?(u.on("click",a.bind(this,n)),u.find(".add-to-cart").on("click",e.bind(this,n,u.find(".add-to-cart")))):"table-view"==t&&u.find(".remove-form-cart").on("click",i.bind(this,n.id))}}}()},function(e,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var a=arguments[i];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},t=a(1),o=function(e){return e&&e.__esModule?e:{default:e}}(t);i.default=function(){function e(){localStorage.setItem("markorusic_webstore_cart_items",JSON.stringify(v))}function i(){v=[],e()}function a(){return v.map(function(e){return e.count*e.price}).reduce(function(e,i){return e+i},0)}function t(){return v.map(function(e){return e.count}).reduce(function(e,i){return e+i},0)}function r(){h.text("("+t()+")")}function s(){g.text(a())}function l(){f.html(""),v.forEach(function(e,i){return o.default.init(e,"table-view",f,i+1)}),s()}function c(){k=!0,b.find("tbody").html(""),v.slice(0,4).forEach(function(e,i){o.default.init(e,"popover-table-view",b.find("tbody"),i+1)}),v.length>4&&b.find("tbody").append('<tr><td class="mt" colspan="4"><a href="/korpa.php" style="color: #fcca39; font-size: 14px;">Pogledaj sve...</a></td><tr>'),s(),b.show("fast"),d(b,"popover-cart")}function u(){k?c():(z.show("fast"),z.find(".show-popover-cart").off().on("click",function(e){e.preventDefault(),z.fadeOut(c)}),d(z,"notification"),j=!0)}function d(e,i){$(e).find(".close-notification").off().on("click",function(a){a.preventDefault(),$(e).hide("fast"),"notification"==i&&(j=!1),"popover-cart"==i&&(k=!1)})}function m(e){e.preventDefault(),v.length>0&&($(this).find("button").css({color:"black",fontSize:"10px"}).text("Molimo Vas da sacekate..."),setTimeout(function(){$("#main-row").html('\n\t\t\t\t\t<div class="col-12 text-center">\n\t\t\t\t\t\t<h3 class="text-center font-25">Vasa narudzbina je poslata, uskoro cete dobiti obavestenje!</h3>\n\t\t\t\t\t\t<p>(Ovo je samo demo sajt, narudzbina nije poslata nigde.)</p>\n\t\t\t\t\t</div>\n\t\t\t\t'),i(),r()},1500))}function p(){$("#main-row").html('\n\t\t\t<div class="col-12">\n\t\t\t\t<h3 class="text-center font-25">Vasa korpa je prazna, <a href="/">ovde</a> mozete pogledati nase proizvode.</h3>\n\t\t\t</div>\n\t\t')}var v=[],j=!1,k=!1,f=$(".cart tbody"),g=$(".total-price"),h=$(".cart-items-count"),b=$(".popover-cart"),z=$(".cart-notification"),y=$(".cart").find(".cache-out");return{init:function(){var e=JSON.parse(localStorage.getItem("markorusic_webstore_cart_items"));e&&(v=e),r()},initCacheOutForm:function(){0==v.length?p():y.on("submit",m)},add:function(i){var a=v.find(function(e){return e.id==i.id});a?(a.count++,v.map(function(e){return e.id==i.id?a:e})):v.push(n({},i,{count:1})),r(),u(),e()},remove:function(i){v=v.filter(function(e){return e.id!=i}),r(),0==v.length?p():this.render(),e()},render:function(){l()}}}()},function(e,i,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var t=a(4),o=n(t),r=a(5),s=n(r),l=a(6),c=n(l),u=a(2),d=n(u);$(function(){var e=window.location.pathname,i=e.substring(e.lastIndexOf("/")+1);$('a[href="'+i+'"]').parent().addClass("active"),o.default.init([["#hero-share-store","#share-store-modal"],[".open-login-modal","#login-modal"],[".open-register-modal","#register-modals"]]),$("button").not(".submit-cart").on("click",function(e){return e.preventDefault()}),"/"!=e&&"/index.php"!=e||((0,s.default)(".shop-counter"),c.default.init()),d.default.init(),"/korpa.php"==e&&(d.default.render(),d.default.initCacheOutForm())})},function(e,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(){function e(){var e=$(".modal-mask"),i=function(i){i.preventDefault(),$("body").css("overflow","auto"),e.hide()};e.on("click",i),e.find(".fa-times").parent().on("click",i),e.find(".modal-wrapper").on("click",function(e){return e.stopPropagation()})}function i(i,a){i.preventDefault(),$(a).show().css("display","flex"),$("body").css("overflow","hidden"),e()}return{init:function(e){e.forEach(function(e){return $(e[0]).on("click",function(a){return i(a,e[1])})})}}}()},function(e,i,a){"use strict";function n(e){var i=Date.parse(e)-Date.parse(new Date),a=Math.floor(i/1e3%60),n=Math.floor(i/1e3/60%60),t=Math.floor(i/36e5%24);return{total:i,days:Math.floor(i/864e5),hours:t,minutes:n,seconds:a}}function t(e){function i(){var e=n(l);t.text(e.days),o.text(("0"+e.hours).slice(-2)),r.text(("0"+e.minutes).slice(-2)),s.text(("0"+e.seconds).slice(-2)),e.total<=0&&clearInterval(c)}var a=$(e),t=a.find(".days"),o=a.find(".hours"),r=a.find(".minutes"),s=a.find(".seconds"),l=new Date(Date.parse(new Date)+1296e6);i();var c=setInterval(i,1e3)}Object.defineProperty(i,"__esModule",{value:!0}),i.default=t},function(e,i,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function t(e){if(Array.isArray(e)){for(var i=0,a=Array(e.length);i<e.length;i++)a[i]=e[i];return a}return Array.from(e)}Object.defineProperty(i,"__esModule",{value:!0});var o=a(0),r=n(o),s=a(1),l=n(s),c=a(8),u=n(c);i.default=function(){function e(e){v.items=v.itemsCopy.filter(function(i){return-1!=i.name.toLowerCase().indexOf(e.target.value)}),a()}function i(e){return"sve"==e?u.default.articles:u.default.articles.filter(function(i){return-1!=i.categories.indexOf(e)})}function a(){m.html(""),v.items.forEach(function(e){return l.default.init(e,"box-view",m)})}function n(){d.off(),d.on("click",function(e){e.preventDefault();var i=$(this).data().sort;r.default.setParam("filter",i),o()})}function o(){var e=r.default.getParam("filter")||"cipele";v.items=i(e),v.itemsCopy=[].concat(t(v.items)),d.removeClass("sb-active"),d.parent().find("[data-sort='"+e+"']").addClass("sb-active"),p.val(""),a(),n()}function s(){var e=r.default.getParam("articleId");if(e){var i=v.items.find(function(i){return i.id==e});i?l.default.showArticle(i):(alert("Proizvod nije pronadjen!"),r.default.removeParam("articleId"))}else r.default.removeParam("articleId")}var c=$(".store-articles-list"),d=c.find("ul li a"),m=c.find(".articles-row"),p=c.find(".search-articles-by-name").find('input[type="text"]'),v={items:[],itemsCopy:[]};return{init:function(){o(),s(),p.on("keyup",e)}}}()},function(e,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={article:function(e){return'\n\t\t\t<div class="store-item-wrapper">\n                <article class="store-articles-list-item"\n                         style="background-image: url(\''+e.img+'\');">\n                    <div class="cpli-overlay">\x3c!-- class overlay --\x3e</div>\n                    <div class="cpli-content">\n                        <div class="article-info-strip">\n                            <div>\n                                <a href="#"><i class="fa fa-eur" aria-hidden="true"></i></a>\n                                <span>'+e.price+'</span>\n                            </div>\n                            <div>\n                                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>\n                                <span>'+e.stars+'</span>\n                            </div>\n                        </div>\n                        <div class="text-center store-article-info">\n                            <p class="font-16">'+e.name+'</p>\n                            <a href="#" class="btn-white add-to-cart">\n                            \t<i class="fa fa-cart-plus font-15" aria-hidden="true"></i> | <span class="content">Dodaj u korpu</span></a>\n                        </div>\n                    </div>\n                </article>\n            </div>\n\t\t'},articleTr:function(e,i){return"\n\t\t\t<tr>\n                <td>#"+i+'</td>\n                <td class="rl-avatar-td">\n                    <a href="#">\n                        <div class="article-avatar"\n                             style="background-image: url(\''+e.img+"');\"></div>\n                    </a>\n                </td>\n                <td>\n                    <span>\n                        "+e.name+"\n                    </span>\n                </td>\n                <td>"+e.count+"</td>\n                <td>"+e.price*e.count+'</td>\n                <td>\n                \t<a href="#" class="remove-form-cart btn btn-danger-btn-sm"><i class="fa fa-times"></i></a>\n                </td>\n            </tr>\n\t\t'},articleTrPopover:function(e){return'\n\t\t\t<tr>\n                <td>\n                    <a href="#">\n                        <div class="article-avatar" style="background-image: url(\''+e.img+"');\"></div>\n                    </a>\n                </td>\n                <td>"+e.name+"</td>\n                <td>"+e.count+"</td>\n                <td>"+e.price*e.count+"</td>\n            </tr>\n\t\t"},articleModal:function(e){return'\n    <div class="modal-mask shop-photo-modal" id="article-photo-modal" style="display: none;">\n        <div class="container">\n            <div class="modal-wrapper">\n                <div class="modal-container">\n                    <div class="flex-space-around-res">\n                        <a class="top-right" href="#"><i class="fa fa-times" aria-hidden="true"></i></a>\n                        <div class="col-12 col-md-8 cpm-bg">\n                            <img src="'+e.img+'" alt="'+e.desc+'" class="img-fluid">\n                        </div>\n\n                        <div class="cpm-bg-fff p-20">\n                            <div class="modal-body">\n\n                                \x3c!-- hdr --\x3e\n                                <div class="shop-photo-modal-header">\n                                    <div class="hdr-wrapper">\n                                        <h2>'+e.name+'</h2>                                        \n                                    </div>\n\n                                    \x3c!-- Vote strip --\x3e\n                                    <p class="article-categories">Katogirije: <span>'+e.categories.join(" | ")+'</span></p>\n                                </div>\n\n                                <div class="article-info-strip">\n                                    <div class="vote-div">\n                                        <a href="#"><i class="fa fa-eur" aria-hidden="true"></i></a>\n                                        <span>'+e.price+'</span>\n                                    </div>\n                                    <div>\n                                        <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>\n                                        <span>'+e.stars+'</span>\n                                    </div>\n                                </div>\n\n                                \x3c!-- body --\x3e\n                                <div class="shop-photo-modal-body">\n                                    <div>\n                                        <p class="init-line-height about-shop-article">'+e.desc+'</p>\n                                    </div>\n                                 \n                                    <div class="actions">\n                                        <a href="#" class="btn-dark add-to-cart" data-toggle="tooltip" data-placement="top" title="Dodato u korupu!" data-animation="false">\n                                <i class="fa fa-cart-plus font-15" aria-hidden="true"></i> | <span class="content">Dodaj u korpu</span></a>\n                                    </div>\n                                </div>\n\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n        '}}},function(e,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={articles:[{id:1,name:"Corthay",img:"./img/articles/cipele/c1-min.jpg",price:"100",stars:"10",categories:["cipele"],desc:"Uživajući kao moderan cipelar, Corthai je preneo znanje preneto iz Compagnons, francuskog srednjovekovnog ceha, kako bi savršeno iskoristio umetničku obuću i koristio različite materijale, tehnike i oblike za ekskluzivni izbor obućarske cipele."},{id:2,name:"Salvatore Ferragamo",img:"./img/articles/cipele/c2-min.jpg",price:"100",stars:"10",categories:["cipele"],desc:"Salvatore Ferragamo je bio elitni brend za cipele nakon što je uhvatio oči holivudskih poznatih ličnosti 1920-ih. Posle tri generacije, lepota i kvalitet Salvatore Ferragamove ručno obučene cipele Italije i dalje su cenjeni i tražen od strane mnogih."},{id:3,name:"A Testoni",img:"./img/articles/cipele/c3-min.jpg",price:"200",stars:"1",categories:["cipele"],desc:"A. Testoni inovativno kombinuje drevne i savremene italijanske dizajnerske tehnike kako bi napravile cipele koje demonstriraju vrhunski talijanski zanat. Svaka cipela je striktno ručno izrađena bez oklevanja u korišćenju najkvalitetnijih materijala uz uključivanje detaljnih detalja o stilu."},{id:4,name:" Christian Louboutin",img:"./img/articles/cipele/c4-min.jpg",price:"140",stars:"4",categories:["cipele"],desc:"Ovaj popularni brend za cipele najizraženiji je svojim potpisom crvenom lakiranom podlogom, zajedno sa dizajnerskim dizajnom koji uključuje patentirane kože i narukvice. Obuća Christian Louboutin postoji kao jedan od najelegantnijih i trendovitih brendova cipela ove ere."},{id:5,name:"Bally",img:"./img/articles/cipele/c5-min.jpg",price:"400",stars:"11",categories:["cipele"],desc:"Kompanija Balli iz Švajcarske uključuje pametne boje i atletski stil u svojom obućom, sve dok održava sofisticiranu estetiku uz upotrebu visokokvalitetnih materijala, elegantan i sjajni dizajn."},{id:6,name:"Berluti",img:"./img/articles/cipele/c6-min.jpg",price:"450",stars:"7",categories:["cipele"],desc:"Od Okfordsa, Loafersa i Derbiesa, Berluti je izrađivao cipele za elegantnog čoveka od 1895. godine. Njegov izbor vrhunske i udobne kožne obuće je napravljen da daje najbolji utisak za te zvanične prilike ili za svakodnevnu casualnu odeću."},{id:7,name:"Brunello Cucinelli",img:"./img/articles/cipele/c7-min.jpg",price:"190",stars:"2",categories:["cipele"],desc:'Poznati kao "kralj luksuza", Brunello Cucinelli je u svoj brend postavio svoj luksuzni materijal i jednostavnu, ali klasičnu paletu boja. Inspirisan prelepim pejzažom Solomeo u Italiji, njegov brend je učinio puno divljenja svojim filozofskim pristupom dizajnu.'},{id:8,name:"Bolvaint",img:"./img/articles/cipele/c8-min.jpg",price:"290",stars:"6",categories:["cipele"],desc:"Za nosioce klasičnih obuće, Bolvaint pokazuje izradu svoje marke svojim pažljivim odabirom kožnog materijala i oštrim okom za detalje. Stil Pariza se postiže svojim sofisticiranim dizajnom i elegantnim imidžom."},{id:9,name:"Crockett And Jones",img:"./img/articles/cipele/c9-min.jpg",price:"490",stars:"10",categories:["cipele"],desc:"Crockett & Jones su proizvođači nekih od najvećih ručno izrađenih engleskih obuće, izrađujući svoje cipele od najfinije kože kože sa vrhunskih tannerija Evrope. Pravo iz Northamptona, kvalitetan i vanvremenski stil naglašen je u procesu čuvanja čarapa."},{id:10,name:"Edward Green",img:"./img/articles/cipele/c10-min.jpg",price:"190",stars:"12",categories:["cipele"],desc:"Tradicija engleske elegancije dobro se drži bezvremenskim stilovima Edvarda Grina, koji su se rodili u Northamptonu 1890. godine. NJihova pažnja na klasične dizajne se i dalje može uočiti u njihovim vještačkim cipelama koje zajedno povezuju sofisticiranost i moderne trendove."},{id:11,name:"Giacometti",img:"./img/articles/cipele/c11-min.jpg",price:"190",stars:"12",categories:["cipele"],desc:"Brend Giacometti, osnovan u Italiji 1890. godine, izgrađen je proizvodnjom obuće sa jedinstvenom konstrukcijom i dizajnom, uključujući bezbrojne varijacije kože i prepoznatljive detalje koji pomažu u postavljanju imena Giacometti od svih ostalih."},{id:12,name:"Santoni",img:"./img/articles/cipele/c12-min.jpg",price:"190",stars:"12",categories:["cipele"],desc:"Brend Santoni je odličan primer istinske odličnosti italijanske čarape. Tradicija i inovacije su ključni elementi tehnikama craftinga, koji se pokreću modernim stavom s drevnim znanjem čine Santoni cipele ističući među modnim svetom."},{id:13,name:"Black Bay Bronze One",img:"./img/articles/satovi/s1-min.jpg",price:"1952",stars:"10",categories:["satovi"],desc:"Brojčanik i korona izrađeni su u specifičnoj khaki zelenoj nijansi dok narukvica od tkanine kompletira jedinstveni izgled. Inače, kompanija Tudor po drugi put učestvuje na renomiranoj Only Watch aukciji."},{id:14,name:"Calister",img:"./img/articles/satovi/s2-min.jpg",price:"851",stars:"2",categories:["satovi"],desc:"Elegantan časovnik dizajniran za pronicljivu žensku osobu. Dimenzionalno gledanje izlučuje skromne proporcije i meri 35mm k 8mm. Ono što ovaj sat čini tako atraktivnim jeste sjajno kućište od nerdjajuceg čelika 316L. Ova šarmantna karakteristika radi u savršenoj saglasnosti sa srebrnim biranjem i zlatnim satima / minutnim rukama. Ostale karakteristike uključuju diskretan prozor za datum (koji se nalazi u 3 sata) crni kožni remen, Svarovski kristalni markeri i Hesalit kristalni objektiv."},{id:15,name:"Miyota 82s0",img:"./img/articles/satovi/s3-min.jpg",price:"724",stars:"3",categories:["satovi"],desc:"Miyota 82s0 nudi čvrsto dizajniran savremeni automatski sat koji bi svakog arhitekte i inženjera trebalo da plače. Ovo je nova kompanija za čuvanje, koja koristi ime iz alata za merenje udaljenosti između dve strane objekta."},{id:16,name:"Rolex Syster Perpetual 67230",img:"./img/articles/satovi/s4-min.jpg",price:"798",stars:"15",categories:["satovi"],desc:"Sat od nerdjajuceg čelika sa finim okretnim okvirom motora (prečnik 25 mm). Crni brojčanik sa markerima. Jubilejna narukvica od nerdjajuceg čelika."},{id:17,name:"Rolex 16233",img:"./img/articles/satovi/s5-min.jpg",price:"447",stars:"9",categories:["satovi"],desc:"Sat od nerdjajuceg čelika sa finim okretnim okvirom motora (prečnik 35 mm). Crni brojčanik sa markerima. Jubilejna narukvica od nerdjajuceg čelika."},{id:18,name:"Relógios Jaragar",img:"./img/articles/satovi/s6-min.jpg",price:"290",stars:"6",categories:["satovi"],desc:"Kompletan kalendar i zaštitni mineralni kristalni prozor, kućište od legure, crni kožni remen. Nerđajući čelik i kron i dizajn posebnog biranja otkrivaju vašu moćnu tačku gledanja."},{id:19,name:"Yazole",img:"./img/articles/satovi/s7-min.jpg",price:"728",stars:"12",categories:["satovi"],desc:"Jednostavan u dizajnu, suptilan u stilu. Moda i moderan dizajn, pogodan za svaku priliku. Vodootporan: otporan na vodu od svakodnevnog života, ali ne za kupanje, plivanje, ronjenje itd. Najbolji izbor kao poklon za venčanje, godišnjicu, rođendan, Valentinovo i druge značajne dane. Veliki okrugli dvostruki dizajn ekrana, veoma lako čitljiv."},{id:20,name:"Ochstin Automatic",img:"./img/articles/satovi/s8-min.jpg",price:"859",stars:"9",categories:["satovi"],desc:"Uvezena automatska mehanička kretanja, veoma izdržljiva za upotrebu. Sa ručnim ležajima od 21 komada, prikazuje se luksuz sa malim ključem. Sapphire dizajn ogledala, otporan na ogrebotine, otporan na vodu. Dvostruki brod, vrlo poseban. 30 m vodootporna klasa, nema potrebe da brinete u kišnim danima. Poslovni stil, posebno pogodan za muškarce u poslovnoj prilici."},{id:21,name:"Patek Philippe",img:"./img/articles/satovi/s9-min.jpg",price:"777",stars:"2",categories:["satovi"],desc:"Patek Philippe smatra se najprestižnijim luksuznim časovničarima u industriji. Početkom 1839. godine u Ženevi kao džepni sat, kompanija Patek Philippe ima dugu i istoriju istorije gledanja, uključujući i prvu kompaniju koja je dodala hronograf, minutni repetitor, večni kalendar i ruku podijeljenih sekundi ručni sat. Klijenti Roial Patek Philippe-a su Prince Albert, Christian IKS, Hussein Kamel iz Egipta, Princeza Louise iz Danske, kraljica Viktorija i Victor Emmanuel III iz Italije..."},{id:22,name:"Corleone",img:"./img/articles/satovi/s10-min.jpg",price:"840",stars:"12",categories:["satovi"],desc:"Corleone L'orologio je osnovan u ograničnom čuvaru maschilea, jer je više element koji doprinosi definisanju lepote i uobičajenih stilova."},{id:23,name:"Weite",img:"./img/articles/satovi/s11-min.jpg",price:"821",stars:"2",categories:["satovi"],desc:"Tri mala ukrasna pod-biranja čine sat jedinstvenim. Kutija od nerdjajuceg čelika je čvrsta u strukturi i neprijatna za oštricu. Kožna satna traka je udobna za nošenje. Klasična kopčica pinova, pogodna za podešavanje."},{id:24,name:"Yazole 602a",img:"./img/articles/satovi/s12-min.jpg",price:"635",stars:"7",categories:["satovi"],desc:"Jednostavan u dizajnu, suptilan u stilu. Moda i moderan dizajn, pogodan za svaku priliku. Vodootporan: otporan na vodu od svakodnevnog života, ali ne za kupanje, plivanje, ronjenje itd. Najbolji izbor kao poklon za venčanje, godišnjicu, rođendan, Valentinovo i druge značajne dane. Veliki okrugli dvostruki dizajn ekrana, veoma lako čitljiv."},{id:25,name:"ZARA 2017",img:"./img/articles/kosulje/k1-min.jpg",price:"328",stars:"7",categories:["kosulje"],desc:"Ova španska kompanija je jedna od najneobičnijih razornih trgovaca na svetu. Ova kompanija osnovana je 1975. godine. Osnivač ove kompanije je Amancio Ortega i Rosalia Mera. Oni su stručnjaci u proizvodnji odjeće svjetske klase. Ova kompanija je kompanija brodskog broda pod posrednom grupom. Oni proizvode oko 10 000 dizajna svake godine i imaju ekspertizu u proizvodnji luksuznih linija za odeću."},{id:26,name:"Camisa de Vestir Hombre",img:"./img/articles/kosulje/k2-min.jpg",price:"303",stars:"11",categories:["kosulje"],desc:"Pamučna svetlo plava kosulja."},{id:27,name:"Paul Jones",img:"./img/articles/kosulje/k12-min.jpg",price:"484",stars:"8",categories:["kosulje"],desc:"Ova elegantna košulja je savršena za izlaske, posao, svakodnevnu varijantu, sve sezone i prilike."},{id:28,name:"Van Heusen",img:"./img/articles/kosulje/k6-min.jpg",price:"549",stars:"7",categories:["kosulje"],desc:"65% poliester, 35% pamuk. Obučene košulje imaju potpunu rukavu, potpunu grudi, konusno sečenje i tanji su u struku."},{id:29,name:"Tom's Ware",img:"./img/articles/kosulje/k5-min.jpg",price:"205",stars:"1",categories:["kosulje"],desc:"Slim fit, odgovara veličini, kvalitetnom tkaninom i izradom stila čini da se osećate dobro i udobno kada ga nosite."},{id:30,name:"Calvin Klein",img:"./img/articles/kosulje/k4-min.jpg",price:"476",stars:"13",categories:["kosulje"],desc:"Slim fit košulja sa konusnim rukavima, rukama sa višim rukama i tanji rezom na grudima i struku."},{id:31,name:"Versace",img:"./img/articles/kosulje/k8-min.jpg",price:"768",stars:"7",categories:["kosulje"],desc:"Obložena plava pamučna košulja sa dugim rukavima sa plutajućim ikonama zvezdica."},{id:32,name:"Versace black",img:"./img/articles/kosulje/k7-min.jpg",price:"764",stars:"4",categories:["kosulje"],desc:"Obložena crna pamučna košulja sa dugim rukavima sa plutajućim ikonama zvezdica."},{id:33,name:"Dickies",img:"./img/articles/kosulje/k3-min.jpg",price:"428",stars:"8",categories:["kosulje"],desc:"65% poliester / 35% pamuk. Radna košulja na prednjoj strani u opuštenoj ponudi sa dugim rukavima i džepovima sa džepovima sa dugmićima."},{id:34,name:"LOCALMODE",img:"./img/articles/kosulje/k9-min.jpg",price:"571",stars:"10",categories:["kosulje"],desc:"100% pamuk. Pogodno za sve vrste aktivnosti."},{id:35,name:"IZOD",img:"./img/articles/kosulje/k11-min.jpg",price:"633",stars:"5",categories:["kosulje"],desc:"SportFlek tehnologija omogućava tkanini da se prostiri za maksimalan komfor."},{id:36,name:"Goodthreads",img:"./img/articles/kosulje/k10-min.jpg",price:"309",stars:"4",categories:["kosulje"],desc:"Ova klasična, svestrana košulja pruža čist, zakačen izgled s posebnim pranjem za mekan osećaj i maksimalan komfor."}]}}]);