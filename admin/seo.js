/* Static, crawlable pages for search engines, generated from content.json.
   Used by the admin panel at every publish (window.SEO.build(content)) and by node for the first build.
   Output: [{path, content}] — /work/<slug>/index.html, /work/index.html, /about/index.html, /sitemap.xml */
(function(root){
  var ORIGIN = 'https://paoloscotto.it';
  var NAME = 'Paolo Scotto di Vettimo';
  var PID = ORIGIN + '/#paolo';

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function L(v, l){ if (v == null) return ''; if (typeof v === 'string') return v; return v[l] || v.en || v.it || ''; }
  function abs(u){ return !u ? '' : /^https?:/.test(u) ? u : ORIGIN + (u.charAt(0) === '/' ? '' : '/') + u; }
  function slugify(s){
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
      .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'project';
  }
  function json(o){ return JSON.stringify(o).replace(/</g, '\\u003c'); }

  function slugs(C){
    var used = {}, out = {};
    (C.projects || []).forEach(function(p){
      if (p.visible === false || !p.name) return;
      var s = slugify(p.name);
      if (used[s]) s = s + '-' + slugify(p.id).slice(-4);
      used[s] = 1; out[p.id] = s;
    });
    return out;
  }

  function kindOf(p){ return p.group === 'Video' ? 'video' : p.group === 'Reportage' ? 'reportage' : 'fashion'; }
  var ROLE = {fashion: 'fashion editorial by', reportage: 'reportage by', video: 'color grading and cinematography by'};
  var GROUP_IT = {'Fashion editorial': 'Editoriale di moda', 'Video': 'Video', 'Reportage': 'Reportage'};

  /* every image of a project, in page order, with a caption */
  function images(p){
    var out = [], k = kindOf(p), n = 0;
    var push = function(im, cap){ if (im && im.src){ out.push({src: im.src, w: im.w, h: im.h, cap: cap}); } };
    if (k === 'video'){
      push(p.coverImg || (p.cover ? {src: p.cover} : null), p.name + ' — ' + ROLE.video + ' ' + NAME);
      (p.pairs || []).forEach(function(q, i){
        push(q.grade, p.name + ' — color graded frame' + (q.label ? ' (' + q.label + ')' : '') + ', color grading by ' + NAME);
        push(q.log, p.name + ' — Rec709 frame before color grading' + (q.label ? ' (' + q.label + ')' : ''));
      });
      (p.stills || []).forEach(function(im, i){ push(im, p.name + ' — still ' + (i + 1) + ', cinematography by ' + NAME); });
    } else {
      var ims = p.images || [], tot = ims.length;
      ims.forEach(function(im, i){ push(im, p.name + ' — ' + ROLE[k] + ' ' + NAME + ', photo ' + (i + 1) + ' of ' + tot); });
      if (!tot && p.cover) push({src: p.cover}, p.name + ' — ' + ROLE[k] + ' ' + NAME);
    }
    var seen = {};
    return out.filter(function(x){ if (seen[x.src]) return false; seen[x.src] = 1; return true; });
  }

  var CSS = '*{box-sizing:border-box}html{background:#0a0a0a;color:#f2f1ec}body{margin:0;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;background:#0a0a0a}' +
    'a{color:inherit}.w{max-width:1600px;margin:0 auto;padding:0 clamp(16px,4vw,48px)}' +
    'header.top{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px 0;flex-wrap:wrap}' +
    '.mono{font-family:Antonio,"Arial Narrow",sans-serif;text-transform:uppercase;letter-spacing:.06em;font-size:14px}' +
    '.top a{text-decoration:none}.brand b{display:block;font-weight:700;letter-spacing:.01em;text-transform:uppercase;font-family:inherit;font-size:15px}.brand span{color:#8d8b85}' +
    'nav.m{display:flex;gap:18px}nav.m a{text-decoration:none;color:#8d8b85}nav.m a:hover{color:#f2f1ec}' +
    'h1{font-size:clamp(44px,8vw,120px);line-height:.95;margin:clamp(30px,6vw,80px) 0 18px;text-transform:uppercase;letter-spacing:-.01em}' +
    '.meta{color:#8d8b85;margin:0 0 22px}.desc{max-width:62ch;font-size:clamp(17px,1.4vw,20px);margin:0 0 10px}.desc.it{color:#b9b7b0;font-size:16px}' +
    '.g{display:flex;flex-wrap:wrap;gap:10px;margin:clamp(30px,5vw,60px) 0}.g figure{margin:0;flex:calc(var(--ar)*100) 1 calc(var(--ar)*22vw);aspect-ratio:var(--ar)}' +
    '.g img{display:block;width:100%;height:100%;object-fit:cover;background:#151515}' +
    '.btn{display:inline-block;border:1px solid #f2f1ec;border-radius:99px;padding:12px 22px;text-decoration:none;margin:6px 8px 6px 0}' +
    '.more{border-top:1px solid #2a2a2a;margin-top:clamp(50px,8vw,100px);padding:28px 0}.more ul{list-style:none;padding:0;margin:14px 0 0;columns:2 240px}.more li{margin:0 0 8px}.more a{text-decoration:none}.more a:hover{text-decoration:underline}' +
    'footer{color:#8d8b85;padding:30px 0 50px;display:flex;gap:18px;flex-wrap:wrap}' +
    '.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px;margin:40px 0}.cards a{text-decoration:none}.cards img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block;background:#151515}.cards b{display:block;margin-top:10px;text-transform:uppercase}.cards span{color:#8d8b85}' +
    '.about{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(24px,5vw,80px);align-items:start;margin-top:30px}.about img{width:100%;height:auto;display:block}' +
    '.facts{list-style:none;padding:0;margin:24px 0}.facts li{display:flex;gap:14px;border-top:1px solid #2a2a2a;padding:8px 0}.facts li span:first-child{color:#8d8b85;min-width:110px}' +
    '@media(max-width:760px){.about{grid-template-columns:1fr}.g figure{flex-basis:100%}}';

  function page(o){
    return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n' +
      '<title>' + esc(o.title) + '</title>\n<meta name="description" content="' + esc(o.desc) + '">\n<meta name="author" content="' + NAME + '">\n' +
      '<meta name="robots" content="index,follow,max-image-preview:large">\n<link rel="canonical" href="' + esc(o.url) + '">\n' +
      '<meta property="og:site_name" content="' + NAME + '">\n<meta property="og:title" content="' + esc(o.ogTitle || o.title) + '">\n<meta property="og:description" content="' + esc(o.desc) + '">\n' +
      '<meta property="og:type" content="' + (o.ogType || 'article') + '">\n<meta property="og:url" content="' + esc(o.url) + '">\n' + (o.image ? '<meta property="og:image" content="' + esc(abs(o.image)) + '">\n<meta name="twitter:card" content="summary_large_image">\n' : '') +
      '<meta name="theme-color" content="#0A0A0A">\n<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Antonio:wght@400&display=swap">\n<style>' + CSS + '</style>\n' +
      '<script type="application/ld+json">' + json(o.ld) + '</script>\n</head>\n<body>\n<div class="w">\n' +
      '<header class="top"><a class="brand" href="/"><b>' + NAME + '</b><span class="mono">Photographer &amp; DoP · Naples / Milan</span></a>' +
      '<nav class="m mono"><a href="/">Portfolio</a><a href="/work/">Index</a><a href="/about/">About</a><a href="/#contact">Contact</a></nav></header>\n' +
      o.body +
      '\n<footer class="mono"><span>© ' + NAME + '</span><a href="/">paoloscotto.it</a><a href="mailto:' + esc(o.email) + '">' + esc(o.email) + '</a>' + (o.ig ? '<a href="https://www.instagram.com/' + esc(o.ig) + '/" rel="me">Instagram @' + esc(o.ig) + '</a>' : '') + '</footer>\n</div>\n</body>\n</html>\n';
  }

  function personRef(C){
    var s = C.site || {}, ig = s.instagram;
    return {'@type': 'Person', '@id': PID, name: NAME, alternateName: 'Paolo Scotto', url: ORIGIN + '/',
      image: abs(s.about || '/og.jpg'), jobTitle: ['Photographer', 'Director of Photography', 'Colorist'],
      sameAs: ig ? ['https://www.instagram.com/' + ig + '/'] : []};
  }

  function build(C){
    C = C || {}; var s = C.site || {}, email = s.email || 'info@paoloscotto.it', ig = s.instagram || '';
    var S = slugs(C), vis = (C.projects || []).filter(function(p){ return S[p.id]; });
    var credits = {}; (s.credits || []).forEach(function(c){ if (c.proj) (credits[c.proj] = credits[c.proj] || []).push(c); });
    var out = [], smap = [];
    var today = new Date().toISOString().slice(0, 10);

    vis.forEach(function(p, idx){
      var slug = S[p.id], url = ORIGIN + '/work/' + slug + '/', k = kindOf(p), ims = images(p);
      var tag = L(p.tag, 'en'), year = L(p.year, 'en');
      var lead = L(p.short, 'en') || L(p.desc, 'en');
      var desc = (lead ? lead.replace(/\s*\.?\s*$/, '. ') : '') + (k === 'video' ? 'Cinematography and color grading' : k === 'reportage' ? 'Photography' : 'Fashion photography') + ' by ' + NAME + '.';
      var cr = (credits[p.id] || []).map(function(c){ return c.name + ' — ' + L(c.what, 'en') + (c.year ? ' (' + c.year + ')' : ''); });
      var gal = ims.map(function(im, i){
        var ar = (im.w && im.h) ? (im.w / im.h).toFixed(4) : '1.5';
        return '<figure style="--ar:' + ar + '"><img src="' + esc(im.src) + '"' + (im.w && im.h ? ' width="' + im.w + '" height="' + im.h + '"' : '') + ' alt="' + esc(im.cap) + '"' + (i > 1 ? ' loading="lazy"' : '') + ' decoding="async"></figure>';
      }).join('');
      var others = vis.filter(function(x){ return x !== p; });
      var same = others.filter(function(x){ return x.group === p.group; }), rest = others.filter(function(x){ return x.group !== p.group; });
      var li = function(x){ return '<li><a href="/work/' + S[x.id] + '/">' + esc(x.name) + '</a> <span class="mono" style="color:#8d8b85">' + esc(L(x.tag, 'en')) + '</span></li>'; };
      var body = '<main>\n<h1>' + esc(p.name) + '</h1>\n<p class="meta mono">' + esc([p.group, tag, year].filter(Boolean).join(' · ')) + '</p>\n' +
        (L(p.desc, 'en') || lead ? '<p class="desc">' + esc(L(p.desc, 'en') || lead) + '</p>\n' : '') +
        (L(p.desc, 'it') || L(p.short, 'it') ? '<p class="desc it" lang="it">' + esc(L(p.desc, 'it') || L(p.short, 'it')) + '</p>\n' : '') +
        (cr.length ? '<p class="meta mono">' + esc(cr.join(' · ')) + '</p>\n' : '') +
        '<p class="meta">' + (k === 'video' ? 'Director of photography and colorist' : 'Photographer') + ': <a href="/about/">' + NAME + '</a></p>\n' +
        (p.reel ? '<p><a class="btn mono" href="' + esc(p.reel) + '" rel="noopener">Watch the video</a></p>\n' : '') +
        '<div class="g">' + gal + '</div>\n' +
        '<p><a class="btn mono" href="/">Open the interactive portfolio</a><a class="btn mono" href="/work/">All projects</a></p>\n' +
        '<section class="more"><p class="mono" style="color:#8d8b85">More ' + esc(L({'Fashion editorial': 'fashion editorials', 'Video': 'video work', 'Reportage': 'reportage'}[p.group] || 'projects', 'en')) + ' by ' + NAME + '</p><ul>' + same.map(li).join('') + '</ul>' +
        (rest.length ? '<p class="mono" style="color:#8d8b85;margin-top:24px">Other projects</p><ul>' + rest.map(li).join('') + '</ul>' : '') + '</section>\n</main>';
      var ld = {'@context': 'https://schema.org', '@graph': [
        {'@type': k === 'video' ? 'CreativeWork' : 'ImageGallery', '@id': url + '#work', name: p.name, headline: p.name, description: desc, url: url,
          inLanguage: 'en', dateCreated: year || undefined, genre: tag || undefined, creator: {'@id': PID}, author: {'@id': PID},
          image: ims.slice(0, 30).map(function(im){ return {'@type': 'ImageObject', contentUrl: abs(im.src), caption: im.cap, width: im.w || undefined, height: im.h || undefined,
            creator: {'@type': 'Person', name: NAME}, creditText: NAME, copyrightNotice: '© ' + NAME}; }),
          video: p.reel ? undefined : undefined},
        personRef(C),
        {'@type': 'BreadcrumbList', itemListElement: [
          {'@type': 'ListItem', position: 1, name: NAME, item: ORIGIN + '/'},
          {'@type': 'ListItem', position: 2, name: 'Projects', item: ORIGIN + '/work/'},
          {'@type': 'ListItem', position: 3, name: p.name, item: url}]}]};
      out.push({path: 'work/' + slug + '/index.html', content: page({
        title: p.name + ' — ' + (tag || p.group) + ' | ' + NAME, ogTitle: p.name + ' · ' + NAME, desc: desc, url: url,
        image: (ims[0] || {}).src || p.cover, ld: ld, body: body, email: email, ig: ig})});
      smap.push({loc: url, images: ims});
    });

    /* index of every project */
    var cards = vis.map(function(p){
      var im = p.coverImg || {src: p.cover};
      return '<a href="/work/' + S[p.id] + '/"><img src="' + esc(im.src) + '" alt="' + esc(p.name + ' — ' + ROLE[kindOf(p)] + ' ' + NAME) + '" loading="lazy" decoding="async"><b>' + esc(p.name) + '</b><span class="mono">' + esc([p.group, L(p.tag, 'en')].filter(Boolean).join(' · ')) + '</span></a>';
    }).join('');
    out.push({path: 'work/index.html', content: page({
      title: 'Projects — fashion, video and reportage | ' + NAME, desc: 'All projects by ' + NAME + ', photographer and director of photography based in Naples and Milan: fashion editorials, fashion films, music videos and reportage.',
      url: ORIGIN + '/work/', ogType: 'website', image: s.about || '/og.jpg', email: email, ig: ig,
      ld: {'@context': 'https://schema.org', '@graph': [{'@type': 'CollectionPage', '@id': ORIGIN + '/work/#page', name: 'Projects by ' + NAME, url: ORIGIN + '/work/', about: {'@id': PID},
        hasPart: vis.map(function(p){ return {'@type': 'CreativeWork', name: p.name, url: ORIGIN + '/work/' + S[p.id] + '/'}; })}, personRef(C)]},
      body: '<main><h1>Projects</h1><p class="desc">Fashion editorials, video work and reportage by ' + NAME + ', photographer, director of photography and colorist based in Naples and Milan.</p><div class="cards">' + cards + '</div></main>'})});
    smap.push({loc: ORIGIN + '/work/', images: []});

    /* about page: the portrait, name and bio in plain HTML */
    var facts = (s.facts || []).map(function(f){ return '<li><span class="mono">' + esc(L(f.k, 'en')) + '</span><span>' + esc(L(f.v, 'en')) + '</span></li>'; }).join('');
    var crl = (s.credits || []).map(function(c){ var pr = c.proj && S[c.proj]; return '<li><span class="mono">' + esc(c.year || '') + '</span><span>' + esc(c.name) + ' — ' + esc(L(c.what, 'en')) + (pr ? ' · <a href="/work/' + pr + '/">see the project</a>' : '') + '</span></li>'; }).join('');
    var portrait = s.about ? '<img src="' + esc(s.about) + '" alt="' + NAME + ', photographer and director of photography, portrait" width="1200" height="1800">' : '';
    var bodyA = '<main><h1>' + NAME + '</h1><p class="meta mono">Photographer · Director of photography · Colorist — Naples / Milan</p>' +
      '<div class="about"><div>' + portrait + '</div><div>' +
      '<p class="desc">' + esc(L(s.statement, 'en')) + '</p><p class="desc">' + esc(L(s.p1, 'en')) + '</p><p class="desc">' + esc(L(s.p2, 'en')) + '</p>' +
      '<p class="desc it" lang="it">' + esc(L(s.statement, 'it')) + ' ' + esc(L(s.p1, 'it')) + ' ' + esc(L(s.p2, 'it')) + '</p>' +
      (facts ? '<ul class="facts">' + facts + '</ul>' : '') +
      (crl ? '<p class="mono" style="color:#8d8b85;margin-top:30px">Publications and awards</p><ul class="facts">' + crl + '</ul>' : '') +
      '<p><a class="btn mono" href="/work/">See all projects</a><a class="btn mono" href="mailto:' + esc(email) + '">' + esc(email) + '</a>' + (ig ? '<a class="btn mono" href="https://www.instagram.com/' + esc(ig) + '/" rel="me">Instagram</a>' : '') + '</p>' +
      '</div></div></main>';
    var person = personRef(C);
    person.description = L(s.statement, 'en'); person.email = 'mailto:' + email;
    person.homeLocation = [{'@type': 'Place', name: 'Naples, Italy'}, {'@type': 'Place', name: 'Milan, Italy'}];
    person.knowsAbout = ['Fashion photography', 'Editorial photography', 'Reportage', 'Cinematography', 'Color grading', 'Fashion film'];
    out.push({path: 'about/index.html', content: page({
      title: NAME + ' — Photographer & Director of Photography, Naples / Milan', ogTitle: NAME + ' · Photographer & DoP',
      desc: NAME + ' (Paolo Scotto) is a photographer, director of photography and colorist based in Naples and Milan, working on fashion editorials, fashion films and reportage.',
      url: ORIGIN + '/about/', ogType: 'profile', image: s.about, email: email, ig: ig, body: bodyA,
      ld: {'@context': 'https://schema.org', '@graph': [{'@type': 'ProfilePage', '@id': ORIGIN + '/about/#page', url: ORIGIN + '/about/', name: NAME, mainEntity: {'@id': PID}}, person]}})});
    smap.unshift({loc: ORIGIN + '/about/', images: s.about ? [{src: s.about, cap: NAME + ', photographer and director of photography'}] : []});
    smap.unshift({loc: ORIGIN + '/', images: [{src: '/og.jpg', cap: NAME + ' — photographer and director of photography'}].concat(s.about ? [{src: s.about, cap: NAME + ', portrait'}] : [])});

    var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
      smap.map(function(u){
        return '  <url>\n    <loc>' + esc(u.loc) + '</loc>\n    <lastmod>' + today + '</lastmod>\n' +
          u.images.map(function(im){ return '    <image:image><image:loc>' + esc(abs(im.src)) + '</image:loc></image:image>\n'; }).join('') + '  </url>\n';
      }).join('') + '</urlset>\n';
    out.push({path: 'sitemap.xml', content: xml});
    return out;
  }

  /* paths of project pages that existed for `before` but not for `after` (renamed or hidden projects) */
  function stale(before, after){
    var a = slugs(before || {}), b = slugs(after || {}), keep = {}, out = [];
    Object.keys(b).forEach(function(id){ keep[b[id]] = 1; });
    Object.keys(a).forEach(function(id){ if (!keep[a[id]]) out.push('work/' + a[id] + '/index.html'); });
    return out;
  }

  var API = {build: build, stale: stale, slugs: slugs};
  if (typeof module !== 'undefined' && module.exports) module.exports = API; else root.SEO = API;
})(this);
