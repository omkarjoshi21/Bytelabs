from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Preformatted
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4

out=Path('output/pdf/Git_GitHub_Beginner_Guide.pdf'); out.parent.mkdir(parents=True,exist_ok=True)
styles={
 'title':ParagraphStyle('title',fontName='Helvetica-Bold',fontSize=28,leading=33,textColor=HexColor('#203e31'),spaceAfter=18),
 'h':ParagraphStyle('h',fontName='Helvetica-Bold',fontSize=14,leading=18,textColor=HexColor('#203e31'),spaceBefore=11,spaceAfter=6),
 'p':ParagraphStyle('p',fontName='Helvetica',fontSize=10.5,leading=14.5,spaceAfter=6),
 'code':ParagraphStyle('code',fontName='Courier',fontSize=9.5,leading=14,backColor=HexColor('#edf1e7'),borderPadding=9,textColor=HexColor('#203e31'),spaceBefore=4,spaceAfter=10),
 'small':ParagraphStyle('small',fontName='Helvetica',fontSize=8,leading=10,spaceAfter=4)
}
story=[]
def p(t): story.append(Paragraph(t,styles['p']))
def h(t): story.append(Paragraph(t,styles['h']))
def code(t): story.append(Preformatted(t,styles['code']))
def page(n,t):
 if story: story.append(PageBreak())
 story.append(Paragraph('GIT &amp; GITHUB / '+str(n).zfill(2),styles['small']))
 story.append(Paragraph(t,styles['title']))
def cmd(c,meaning,use):
 code(c); p('<b>Meaning:</b> '+meaning+'<br/><b>Use it when:</b> '+use)

page(1,'Your project companion')
p('A simple reference for Omkar Joshi. Learn what to type, what it does, and when you need it. Examples use ByteLabs on Windows. Prepared 4 October 2026.')
h('Five words to remember')
p('<b>Repository:</b> your project plus its saved Git history.<br/><b>Branch:</b> a named line of work, such as main or demo.<br/><b>Commit:</b> a recorded checkpoint on the current branch.<br/><b>Local:</b> on your computer.<br/><b>Remote:</b> a repository elsewhere, such as GitHub. origin is its usual nickname.')
h('The everyday journey')
code('Edit files -> git add -> git commit -> git push\nComputer                                  GitHub')
p('Saving a file in your editor does not make a commit. A commit is local until you push it. Pushing does not merge a different branch into main.')
h('GitHub is not your live website')
p('Git tracks changes. GitHub stores and reviews them. Render builds and publishes your website. A successful push does not prove deployment succeeded: check Render, then open the live site.')
h('Read this guide by situation')
p('Page 2: check your project and save work.<br/>Page 3: download, upload, and understand branches.<br/>Page 4: recommended daily workflow with a pull request.<br/>Page 5: your demo/main case and working directly on main.<br/>Page 6: common errors and careful recovery.<br/>Page 7: setup, website commands, and quick reference.')
p('<b>Before typing:</b> run commands inside the project folder, one at a time. If a command reports an error, stop and understand it before continuing. Names such as fix-mobile are examples you can replace.')

page(2,'Check first. Save second.')
cmd('cd /d E:\\Porjects_Update\\Bytelabs','Opens your project folder in Windows Command Prompt.','You opened a new CMD window. In PowerShell use: Set-Location E:\\Porjects_Update\\Bytelabs')
cmd('git status','Shows the current branch, staged changes, unstaged changes, and new files.','Before switching, committing, pulling, or pushing.')
cmd('git diff','Shows edits in tracked files that are not staged. It does not show new untracked file contents.','You want to review your changes before selecting them.')
cmd('git add src/App.css src/ByteLabs.jsx','Selects these files for the next commit.','You want to include only specific files.')
cmd('git add .','Selects additions, edits, and deletions under the current folder.','All those changes belong in your next commit. Review first; do not include passwords or .env secrets.')
cmd('git diff --staged','Shows the tracked content selected for your next commit.','You want one final check before committing.')
cmd('git commit -m "Fix mobile heading and email links"','Records your staged changes on your current local branch.','You have finished a meaningful piece of work. It does not upload anything.')
p('<b>Good messages:</b> say what changed: "Add Google verification file" is clearer than "update". Unstaged edits are not included in the commit.')

page(3,'Connect your computer to GitHub')
cmd('git fetch --prune origin','Downloads current remote branch information and removes stale tracking references. It does not merge files or delete your local branches.','You want fresh information before checking ahead/behind.')
cmd('git branch -vv','Lists local branches, their latest commits, and tracking information. The star marks your current branch.','You are unsure where you saved your work.')
p('<b>ahead 1:</b> one local commit is not in the tracked remote branch.<br/><b>behind 2:</b> the tracked remote branch has two commits you lack.<br/><b>Important:</b> tracking information can be old until you fetch.')
cmd('git switch main','Switches to local main. It does not download GitHub updates.','You want to work on main or update it. Commit or stash unfinished work first.')
cmd('git pull --no-rebase origin main','Fetches GitHub main and integrates it into your CURRENT branch using merge behavior.','You are on main and want its latest updates. Check git status first.')
p('<b>Why --no-rebase?</b> It explicitly chooses merge, preserving existing commits. If only GitHub has new commits, Git may simply move forward; if both sides have new commits, it may create a merge commit. Conflicts are still possible. Plain git pull follows your Git configuration.')
cmd('git push -u origin fix-mobile','Uploads fix-mobile and sets its tracking branch. It can create that branch on GitHub.','The first push of a new local branch. Later, git push is enough when tracking is configured.')
cmd('git push origin main','Uploads local main commits to GitHub main.','You intend to update main and direct pushes are allowed. It does not upload commits that exist only on demo.')

page(4,'Recommended daily workflow')
p('Use a separate branch for each change. This keeps main stable and lets you review work before adding it to the main project.')
h('1. Start from an updated main')
code('git status\ngit switch main\ngit pull --no-rebase origin main\ngit switch -c fix-mobile')
p('Start with a clean working tree. The last command creates fix-mobile from your current main and switches to it. Use a fresh name for each task.')
h('2. Edit and check the website')
code('npm run dev\n# Edit your files and check desktop and mobile layouts.')
p('Open the local address printed by the development server. Stop it with Ctrl+C when needed. Check the changed behavior, not just how it looks.')
h('3. Record and upload the change')
code('git status\ngit diff\ngit add .\ngit diff --staged\ngit commit -m "Fix mobile heading and email links"\ngit push -u origin fix-mobile')
h('4. Create a pull request on GitHub')
p('Open your repository, then Pull requests > New pull request. Set <b>base: main</b> and <b>compare: fix-mobile</b>. Review the diff, create the PR, and merge when ready. A PR is a request to combine branches; creating one does not merge it.')
h('5. Bring the merge back to your computer')
code('git switch main\ngit pull --no-rebase origin main\ngit branch -d fix-mobile')
p('Delete the local branch only after its work is integrated. If -d refuses, do not force deletion: inspect first. A squash merge can cause this even when the changes are present. Check Render deployment if this updates the live site.')

page(5,'What happened to your demo branch?')
p('Based on the output you shared, main pointed to the earlier PR merge. Your local demo pointed to a newer commit called "Errors Fixed". These were separate branch histories.')
code('main: earlier changes merged through PR #2\ndemo: earlier changes + "Errors Fixed"')
p('Deleting demo on GitHub did not delete demo on your computer. Committing on local demo saved your fixes there. Pushing main could not upload those demo-only commits. "Up to date" described main, not every branch. "4 hours ago" was a commit timestamp, not an error.')
h('Option A: use another PR')
code('git switch demo\ngit push -u origin demo')
p('This recreates the GitHub demo branch if needed. Create a PR with base main and compare demo, then merge it. Update local main afterwards. This works with rules that require pull requests.')
h('Option B: merge locally and push main')
code('git status\ngit switch main\ngit pull --no-rebase origin main\ngit merge demo\ngit push origin main')
p('Use this only if direct main pushes are allowed and the working tree is clean. git merge demo adds demo history into your current branch. Stop if it reports conflicts. After success, git branch -d demo can remove the local branch.')
h('Future work directly on main')
code('git switch main\ngit pull --no-rebase origin main\n# Edit and test.\ngit add .\ngit commit -m "Describe the change"\ngit push origin main')
p('Choose one approach, not both. A branch-and-PR workflow is useful even for a solo project because you can review changes before merging.')

page(6,'When something goes wrong')
h('"Rejected (fetch first)" or "non-fast-forward"')
p('GitHub has history your local branch lacks. Do not force-push to bypass it. For main, check git status, ensure you are on main, then pull --no-rebase origin main. Resolve any conflict, review and test, then push again.')
h('"Nothing to commit, working tree clean"')
p('No uncommitted changes exist in this checkout. It does not mean every branch was uploaded. Check git branch -vv and git log -1 --oneline. Confirm the file was saved and you are in the right project.')
h('Merge conflicts')
p('Both histories changed overlapping content. Run git status to identify files. Open them and resolve the sections between conflict markers: &lt;&lt;&lt;&lt;&lt;&lt;&lt;, =======, and &gt;&gt;&gt;&gt;&gt;&gt;&gt;. Keep the correct result and remove the markers. Then stage the resolved files, run checks, and git commit. If unsure, stop and ask for help.')
code('git merge --abort')
p('Use during an unfinished merge to cancel it. Start merges with a clean working tree so cancelling is more predictable. Do not run this after a completed merge expecting it to undo history.')
h('Unstage a file without deleting your edits')
code('git restore --staged src/App.css')
p('Removes the file from the next commit selection. Your edited file remains on disk. This example assumes the repository already has a commit.')
h('Temporarily put unfinished work aside')
code('git stash push -u -m "Unfinished mobile work"\ngit stash list\ngit stash apply\n# After checking the restored work: git stash drop')
p('Stash saves tracked edits and, with -u, untracked files. It does not upload them or include ignored files. apply restores the latest stash but keeps it as a backup; it may cause conflicts. Only drop after checking.')
h('Commands to understand before using')
p('<b>git restore FILE</b> discards unstaged edits in that tracked file.<br/><b>git reset --hard, git clean -fd, git branch -D, git push --force</b> can discard work or overwrite history. They are not routine fixes for a rejected push.')

page(7,'Keep this page nearby')
h('Getting an existing project onto a new computer')
code('git clone https://github.com/omkarjoshi21/Bytelabs.git\ncd Bytelabs\nnpm install')
p('clone creates a new project folder with Git history. Do not clone into your existing project folder. npm install reads package.json and installs dependencies; run scripts only from a project you trust.')
h('First-time Git identity')
code('git config --global user.name "Your Name"\ngit config --global user.email "your-email@example.com"')
p('Replace both values. They identify your commits, not your GitHub login. Use your GitHub-provided no-reply email if you want privacy. --global applies to your user account; omit it to configure only this repository.')
h('Useful inspection commands')
code('git remote -v\ngit log --oneline -5\ngit log --oneline origin/main..demo\ngit diff main...demo')
p('In order: show remote addresses; show five recent commits; show demo commits absent from your last fetched origin/main; show demo changes since its common ancestor with main. Fetch first for a fresh remote comparison.')
h('Website commands for this ByteLabs project')
code('npm run dev       # local development server\nnpm run lint      # code checks\nnpm run test      # interaction tests\nnpm run build     # create production files\nnpm run preview   # locally preview an existing build')
p('The # comments above explain each line; you can type just the command. These scripts come from this project\'s package.json and may differ in another project. preview is not deployment. Keep node_modules, generated dist files, and secrets out of commits according to your .gitignore.')
h('Before you leave your project')
p('Check the branch. Review the changes. Run relevant checks. Commit with a clear message. Push the correct branch. If needed, merge the PR. Check hosting deployment and test the live page.')
h('Official references')
story.append(Paragraph('Git command reference: <link href="https://git-scm.com/docs">git-scm.com/docs</link><br/>Pull and merge behavior: <link href="https://git-scm.com/docs/git-pull">git-scm.com/docs/git-pull</link><br/>Restore behavior: <link href="https://git-scm.com/docs/git-restore">git-scm.com/docs/git-restore</link><br/>Pull requests: <link href="https://docs.github.com/en/pull-requests/reference/pull-requests">docs.github.com/en/pull-requests/reference/pull-requests</link>',styles['small']))

def footer(c,d):
 c.setStrokeColor(HexColor('#ccd5c7')); c.line(42,42,A4[0]-42,42)
 c.setFont('Helvetica',8); c.setFillColor(HexColor('#536351'))
 c.drawString(42,28,'BYTELABS  |  Git & GitHub beginner guide'); c.drawRightString(A4[0]-42,28,str(d.page))
doc=SimpleDocTemplate(str(out),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=40,bottomMargin=58,title='Git & GitHub Beginner Guide',author='ByteLabs')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print(out.resolve())



