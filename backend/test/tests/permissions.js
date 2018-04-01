const test = require('../testlib');

test.run(async function () {
    await test('admin', async function (assert, req) {
        //Test paging
        var res = await req({
            url: '/users/2/permissions?pagesize=1&page=2',
            method: 'get'
        });

        assert.equal(res.status, 200, 'Status should be OK');
        assert.equal(res.data.paging, {
            page: 2,
            total: 2,
            pagesize: 1
        }, 'Paging data fail for ' + res.config.url);
        assert.equal(res.data.results.length, 1, "Should be 1 results.");

        var res = await req({
            url: '/users/2/permissions',
            method: 'get'
        });

        assert.equal(res.status, 200, 'Get of permissions should be OK');
        assert.equal(res.data.results, [
            {
                domainId: '1',
                domainName: 'example.com'
            },
            {
                domainId: '2',
                domainName: 'slave.example.net'
            }
        ], 'Get permissions result fail');


    });

    await test('user', async function (assert, req) {
        var res = await req({
            url: '/users/2/permissions',
            method: 'get'
        });

        assert.equal(res.status, 403, 'Get of permissions should fail for user.');
    });
});