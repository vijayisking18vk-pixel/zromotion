import json
import re

text = """Billboard
[https://www.billboard.com/](https://www.billboard.com/)Best known for the Hot 100 and Billboard 200, which list the most popular songs and albums each week in the industry. Offers industry news, events, podcasts, and music streaming.
1
Rank
15,239
Mentions
Business Insider
[https://www.businessinsider.com/](https://www.businessinsider.com/)High-end business journalism keeping readers up-to-date on economic news as well as interviews with top entrepreneurs. There’s also educated predictions, trend analyses, and tips.
2
Rank
11,950
Mentions
People
[https://people.com/](https://people.com/)Covers all things showbusiness, including celebrity gossip, entertainment news, and the latest on new shows, movies, and popular books.
3
Rank
10,800
Mentions
TMZ
[https://www.tmz.com/](https://www.tmz.com/)Podcasts, interviews, videos, and photo galleries covering the latest entertainment news in Australia and around the world. Articles primarily cover celebrity lifestyle, focusing on health, beauty, fashion, as well as travel.
4
Rank
9,415
Mentions
Entrepreneur
[https://www.entrepreneur.com/](https://www.entrepreneur.com/)Find business news, webinars and events, book recommendations, and interviews with successful entrepreneurs. The site is updated daily and even has a magazine for longer-form pieces.
5
Rank
8,923
Mentions
Seeking Alpha
[https://seekingalpha.com/](https://seekingalpha.com/)Seeking Alpha is an investing community which includes millions of passionate investors who connect daily to discuss the latest news, debate the merits of stocks and investment decisions.
6
Rank
8,193
Mentions
Yahoo! Sports
[https://sports.yahoo.com/](https://sports.yahoo.com/)Covers all the top sports as well as fantasy leagues. In addition to sports coverage, opinion pieces and predictions over football, hockey, and soccer and other sports can be found.
7
Rank
6,841
Mentions
The Verge
[https://www.theverge.com/](https://www.theverge.com/)The Verge is an ambitious multimedia effort founded nine years ago to examine how technology will change life in the future for a massive mainstream audience.
8
Rank
6,739
Mentions
Elle
[https://www.elle.com/](https://www.elle.com/)Featuring beauty tips, fashion news, and celebrity trends.
9
Rank
6,673
Mentions
NME
[https://www.nme.com/](https://www.nme.com/)Standout voice in pop culture and music delivering top news across artists, albums, film, TV, and video. Online gig guide, shop, and radio access covering the latest.
10
Rank
6,639
Mentions
RollingStone
[https://www.rollingstone.com/music/](https://www.rollingstone.com/music/)Features news and coverage across music, film, television, and politics, reviewing albums, songs, and celebrities. Interactive source for historical rankings and magazine content.
11
Rank
5,763
Mentions
Harvard Business Review
[https://hbr.org/](https://hbr.org/)Get practical advice on issues befalling business owners, such as how to overcome present challenges and keep a future-oriented viewpoint. Articles are written by experts in the field of business.
12
Rank
5,682
Mentions
MarketWatch
[https://www.marketwatch.com/markets](https://www.marketwatch.com/markets)MarketWatch shares breaking industry news and in-depth analysis to ensure investors receive the the most important and critical information that they need.
13
Rank
5,585
Mentions
HotNewHipHop
[https://www.hotnewhiphop.com/](https://www.hotnewhiphop.com/)All the hottest news and music within hip hop. Coverage of artist activity, the reigning top 100, songs, mixtapes, and albums.
14
Rank
4,859
Mentions
The Athletic
[https://www.nytimes.com/athletic/](https://www.nytimes.com/athletic/)This site offers a subscription for in-depth sports news and features. It also has a podcast for avid sports fans. Find articles about major sports, sports teams, and top cities.
15
Rank
4,636
Mentions
Fast Company
[https://www.fastcompany.com/](https://www.fastcompany.com/)With an editorial focus on innovation in technology, world changing ideas, leadership, creativity, and design, FastCompany gives readers economic news and advice on how to better grow their business.
16
Rank
4,550
Mentions
GQ
[https://www.gq.com/](https://www.gq.com/)A well-known men’s magazine focused on men’s fashion, style, grooming, and improving lifestyle habits. There are fitness tips and nutrition advice as well as articles on men’s culture.
17
Rank
4,121
Mentions
Bleacher Report
[https://bleacherreport.com/](https://bleacherreport.com/)Covers top viewed sports such as football, hockey, basketball, MMA, and more. Betting and video games are covered too. There’s a magazine in addition to the site offering in-depth features.
18
Rank
4,107
Mentions
TechCrunch
[https://techcrunch.com](https://techcrunch.com/)Founded by Michael Arrington and later sold to AOL, TechCrunch has remained as one of the leaders covering tech industry news.
19
Rank
3,876
Mentions
Vogue.co.uk
[http://www.vogue.co.uk/](http://www.vogue.co.uk/)Fashion, trends, latest news, catwalk photos, and designers.
20
Rank
3,667
Mentions
Wired
[https://www.wired.com](https://www.wired.com/)Wired.com focuses on how emerging technologies affect culture, the economy, and politics.The website provides an in-depth coverage of current and future trends in technology.
21
Rank
3,586
Mentions
Page Six
[https://pagesix.com/](https://pagesix.com/)A long-standing news source that covers entertainment as well as current events. Articles are relevant and accessible, while a free streaming network keeps people in touch with the latest developments.
22
Rank
3,532
Mentions
Pitchfork
[https://pitchfork.com/](https://pitchfork.com/)The latest in music and jams without the distraction of ads and clickbait. Top charts, videos, and celebrity features along with recommendations, the best apps, and music news.
23
Rank
3,467
Mentions
Gizmodo
[https://gizmodo.com/](https://gizmodo.com/)Originally launched as a part of Gawker Media Network, Gizmodo is a design, technology, science and science fiction website that also features articles on politics.
24
Rank
3,439
Mentions
Entertainment Tonight
[https://www.etonline.com/](https://www.etonline.com/)Articles celebrate geek culture, including news about cult movies and TV shows. Opinion pieces review new and upcoming books, comics, and movies in the geek world along with popular clothing, collectibles, toys, and games.
25
Rank
3,195
Mentions
Cosmopolitan.com
[https://www.cosmopolitan.com/](https://www.cosmopolitan.com/)The online face of the internationally renowned women’s magazine, offering tried and trusted advice geared towards women for decades. Covers the latest in entertainment as well as beauty tips, fashion trends, relationship advice, and more.
26
Rank
3,105
Mentions
talkSPORT
[https://talksport.com/](https://talksport.com/)This sports radio station covers various sports, among them football and boxing. There’s even an option to listen live to sport commentators and active events. Podcasts and schedules available too.
27
Rank
2,905
Mentions
Sporting News
[https://www.sportingnews.com/](https://www.sportingnews.com/)Frequently updated and covers sports ranging from football, basketball, baseball, and more. Fantasy and betting also included. Offers sports news for four other countries too, such as Canada and China.
28
Rank
2,880
Mentions
Cointelegraph
[https://cointelegraph.com/](https://cointelegraph.com/)Founded seven years ago, Cointelegraph is a completely independent publication covering cryptocurrency, the blockchain, decentralized applications, the internet of finance and the next gen web.
29
Rank
2,839
Mentions
Esquire
[https://www.esquire.com/](https://www.esquire.com/)A long trusted resource that keeps up-to-date with the latest in men’s fashion. Includes lifestyle advice along with breaking news covering everything from current events and politics to Hollywood celebrity gossip.
30
Rank
2,692
Mentions
EssentiallySports
[https://www.essentiallysports.com/](https://www.essentiallysports.com/)Aims to close the gap between fan opinion and expert analysis. Articles include sports news, op-eds, and in-depth features. Sports include formula 1, MMA, football, cricket, tennis, and MBA.
31
Rank
2,494
Mentions
HipHopDX
[https://hiphopdx.com/](https://hiphopdx.com/)Continual coverage of hip hop news and coverage, including updates on favorite artists in the genre. Reviews cover singles, releases, and videos with release dates and editorials.
32
Rank
2,427
Mentions
Harper's BAZAAR
[https://www.harpersbazaar.com/](https://www.harpersbazaar.com/)Up-to-date information on top new trends for the fashion-minded. Covers the latest styles to hit the runways in hair, makeup, and clothing, focusing on chic and sophisticated looks for fashionistas and professionals.
33
Rank
2,412
Mentions
Louder
[https://www.loudersound.com/](https://www.loudersound.com/)Rock-specific music site with significant social media influence. Home of magazines Classic Rock, Metal Hammer, Prog, and Blues, covering news in alternative rock, hard rock, indie, and more.
34
Rank
2,339
Mentions
Digital Spy
[https://www.digitalspy.com/](https://www.digitalspy.com/)Entertainment news geared towards those in the UK. Daily updates include trending articles covering stars in the most popular shows, movies, and soap operas along with notable corporate and political figures.
35
Rank
2,332
Mentions
Sky Sports
[https://www.skysports.com/](https://www.skysports.com/)Get the latest sports news as well as live TV, live football scores, bets, games, and more. Sports include F1, cricket, golf, tennis, racing, rugby, cycling, and darts.
36
Rank
2,275
Mentions
theScore.com
[https://www.thescore.com/](https://www.thescore.com/)Get highlights, in-depth features, and reports for top sports, including football and basketball, as well as how current events impact sports. An app for the site is also available.
37
Rank
2,271
Mentions
Mashable
[https://mashable.com/](https://mashable.com/)Mashable is a global, multi-platform media and entertainment company. Powered by its own proprietary technology, Mashable is the go-to source for tech, digital culture and entertainment content.
38
Rank
2,183
Mentions
FanSided
[https://fansided.com/](https://fansided.com/)A sports news site focusing on sports, sport fandoms, entertainment, and lifestyle pieces. It’s family owned and provides editorial content for all things sports related, such as football or racing.
39
Rank
2,165
Mentions
CNET
[https://www.cnet.com/news/](https://www.cnet.com/news/)CNET tracks all the latest consumer technology breakthroughs and shows you what's new, what matters and how technology can enrich your life.
40
Rank
2,144
Mentions
CoinDesk
[https://www.coindesk.com/](https://www.coindesk.com/)With over 10 million unique visitors, CoinDesk is the leading digital media, events and information service company for the crypto asset and blockchain technology community.
41
Rank
2,081
Mentions
Hollywood Life
[https://hollywoodlife.com/](https://hollywoodlife.com/)Entertainment news source geared towards a modern, over 18 audience. Posts include the most popular viral videos and memes sourced from around the web, with entertaining commentary links from contributors.
42
Rank
2,067
Mentions
Loudwire
[https://loudwire.com/](https://loudwire.com/)Engaging rock and metal music coverage celebrating 50 years of metal and a lifetime of loud music. Features news, lists, songs, and albums along with events and media coverage.
43
Rank
1,780
Mentions
Men's Health
[https://www.menshealth.com/](https://www.menshealth.com/)A popular male-oriented magazine covering everything from workouts and fitness to sex and dating advice. Technology, lifestyle, and grooming tips also available.
44
Rank
1,743
Mentions
BroBible
[https://brobible.com/](https://brobible.com/)Find the latest articles for everything guys care about, whether it’s video games, sports, fashion advice, dating tips, pop culture, and more.
45
Rank
1,716
Mentions
E! News
[https://www.eonline.com/news](https://www.eonline.com/news)Offers authoritative news on the latest coming out of Hollywood, including celebrity rumors, gossip, and exclusive interviews. Articles, photos, and live online episodes give an intimate look into the lives of the most popular celebrities today.
46
Rank
1,707
Mentions
Sports Illustrated
[https://www.si.com/](https://www.si.com/)Sports Illustrated provides sports news, expert analysis, highlights, stats and scores for the NFL, NBA, MLB, NHL, college football, soccer, fantasy, gambling and more
47
Rank
1,689
Mentions
Ars Technica
[https://arstechnica.com/](https://arstechnica.com/)Founded by Ken Fisher over 20 years ago, Arstechnica (Art of Technology) is devoted to the latest technology that would cater to what he called "alpha geeks": technologists and IT professionals.
48
Rank
1,591
Mentions
Small Business Trends
[https://smallbiztrends.com/](https://smallbiztrends.com/)Find financial, marketing, management, and technology advice on this site. It also covers current events and gives tips on how small business can become more successful.
49
Rank
1,563
Mentions
Far Out Magazine
[http://faroutmagazine.co.uk](http://faroutmagazine.co.uk/)Over the last ten years, Far Out has been building an outstanding reputation among its growing audience, covering new music and classic rock.
50
Rank
1,548
Mentions"""

lines = text.strip().split('\n')
data = []
i = 0
while i < len(lines):
    name = lines[i].strip()
    link_line = lines[i+1].strip()
    match = re.search(r'\[(.*?)\]\((.*?)\)(.*)', link_line)
    if not match:
        i += 1
        continue
    url_text = match.group(1)
    url = match.group(2)
    desc = match.group(3).strip()
    
    rank_num = lines[i+2].strip()
    # next line is 'Rank'
    mentions_num = lines[i+4].strip()
    # next line is 'Mentions'
    
    data.append({
        "id": int(rank_num),
        "name": name,
        "url": url,
        "description": desc,
        "rank": int(rank_num),
        "mentions": mentions_num
    })
    
    i += 6

with open('src/data/media.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print(f"Parsed {len(data)} items")
