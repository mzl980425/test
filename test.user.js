// ==UserScript==
// @name        CR 🌈💨
// @description CodeReview 彩虹屁脚本，在 CodeReview 界面的「审阅通过」按钮右侧有个「🌈💨」，点击后默认会给 package.json 文件提交评论。评论文案可在下方 TEXT_LIST 内修改，一行一条，最终会随机抽取一条进行提交。
// @match       https://cr.def.alibaba-inc.com/
// @match       https://cr.o2.alibaba-inc.com/
// @grant       none
// @version     1.3
// @author      -
// @downloadURL https://gitlab.alibaba-inc.com/zhaolan.mzl/qindu-fork/raw/master/scripts/CR%E5%BD%A9%E8%99%B9%E5%B1%81.user.js
// ==/UserScript==

const TEXT_LIST = `
你的代码写得真棒
这代码设计简洁，逻辑清晰
能写出这样的代码，你真是不可多得的人才
`.split('\n').filter(Boolean);

const pickedText = TEXT_LIST[Math.floor(Math.random() * TEXT_LIST.length)];

(new MutationObserver((record, observer) => {
  if ([...record].some(({ type, addedNodes }) => type === 'childList' && [...addedNodes].some(({ className }) => className === 'mr-info'))) {
    observer.disconnect();
    init();
  }
})).observe(document.getElementById('ice-container'), { childList: true, subtree: true });

async function init() {
  await fetch(`/api/codereview/detail${location.search}`)
    .then(res => res.json())
    .then(({ data }) => {
      const { accepted_revision, mergeBase } = data;
      const button = document.createElement('button');
      document.querySelector('.btn-wrap').append(button);
      button.innerText = '🌈💨';
      button.className = 'kt-button secondary-button';
      button.style.marginLeft = '8px';
      button.onclick = async () => {
        await fetch('/api/codereview/comments/new', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=UTF-8' },
          body: JSON.stringify({
            commit_id: accepted_revision,
            comparison_commit_id: mergeBase,
            note: pickedText,
            parent_note_id: null,
            line: 1,
            is_draft: false,
            labelIds: null,
            path: 'package.json',
            side: 'left',
            closed: null,
            projectId: new URLSearchParams(location.search).get('projectId'),
            mergeRequestId: new URLSearchParams(location.search).get('mergeRequestId'),
          }),
        })
          .then(res => res.json())
          .then(({ data }) => {
            if (data) {
              button.innerText = `✅ ${pickedText}`;
              button.onclick = () => {};
            }
          });
      };
    });
}
