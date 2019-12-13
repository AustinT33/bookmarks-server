
function makeBookmarksArray() {
    return [  
    {
        id: 1,
        url: 'www.testurl1.com', 
        title: 'test1', 
        rating: 4, 
        description: 'testbookmark',
    },
    {
        id: 2,
        url: 'www.testurl2.com', 
        title: 'test2', 
        rating: 4, 
        description: 'testbookmark2',
    },
    {
        id: 3,
        url: 'www.testurl3.com', 
        title: 'test3', 
        rating: 4, 
        description: 'testbookmark3',
    },
    ];
}

function makeMaliciousBookmark() {
    const maliciousBookmark = {
      id: 911,
      title: 'Naughty naughty very naughty <script>alert("xss");</script>',
      url: 'https://www.hackers.com',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
      rating: 1,
    }
    const expectedBookmark = {
      ...maliciousBookmark,
      title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
      maliciousBookmark,
      expectedBookmark,
    }
  }

module.exports = {
    makeBookmarksArray,
    makeMaliciousBookmark,
}