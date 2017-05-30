var LABEL_RULES = {
  // Define label rules here:
  // 'label_text': 'label_css_class'
  'needs-estimate': 'attention-label',
  'blocked': 'blocked-label',
  'needs-pm': 'blocked-label',
  'needs-discussion': 'blocked-label',
  'needs-investigation': 'blocked-label',
  'needs-design': 'blocked-label',
  'needs-specs': 'blocked-label',
  'needs-manual-testing': 'blocked-label',
  'needs-tests': 'blocked-label',
  'needs-feedback': 'blocked-label',
  'needs-ceo': 'blocked-label',
  'placeholder': 'planner-label'
  'live': 'live-label'

};

chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(handleMutationEvents);
      });

      // configuration of the observer:
      var config = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
      };

      observer.observe(document, config);

      var handleMutationEvents = function handleMutationEvents(mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, styleLabelsInNode);
        styleLabelsInNode(mutation.target);
      };

      var styleLabelsInNode = function styleLabelsInNode(node) {
        if (nodeIsElement(node)) {
          styleLabels(findLabelsInNode(node));
        }
      };

      var nodeIsElement = function nodeIsElement(node) {
        return (typeof node.querySelectorAll !== 'undefined');
      };

      var findLabelsInNode = function findLabelsInNode(node) {
        return node.querySelectorAll('a.label');
      };

      var styleLabels = function styleLabels(labels) {
        Array.prototype.forEach.call(labels, function(label) {
          Object.keys(LABEL_RULES).forEach(function(label_rule){
            if (label.textContent.match(label_rule)) {
            label.classList.add(LABEL_RULES[label_rule]);
          }
          });
        });
      }
    }
  }, 10);
});
