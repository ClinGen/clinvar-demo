/** @jsx React.DOM */
React = require('react');


// Calculate the authorization token
function getgbToken(rsrcURI, gbLogin, userPassword, gbTime) {
    var sha1 = require('sha1');
    var credential = sha1(gbLogin + userPassword);
    return sha1(rsrcURI + credential + gbTime);
}


// Build a query string, including authorization token
function buildAuthToken(rsrcURI, gbLogin, userPassword) {
    var gbTime = Math.floor(Date.now() / 1000); // Convert JS time to POSIX time
    var gbToken = getgbToken(rsrcURI, gbLogin, userPassword, gbTime);
    return ('&gbLogin=' + gbLogin + '&gbTime=' + gbTime + '&gbToken=' + gbToken).trim();
}


// Build a URL for the REST request
function buildURL(genbHost, gbLogin, usrPass,rsrcPath, propPath, detailed) {
    var http = 'http://';
    var uri= http + genbHost + rsrcPath + propPath + detailed;
    var authToken = buildAuthToken(uri, gbLogin, usrPass);
    return uri + authToken;
}


function getGBDataURL() {
    // Credentials
    var gbLogin = 'forresttanaka';
    var usrPass = 'GdMEzHaKqdZbTFsYGakqCHPGtYfFHkW8sqBtf3cd';

    // Database configuration
    var kbName = 'acmg-Test';
    var grpName = 'acmg-apiTest';
    var collName = 'acmg-lit';

    // Query configuration 
    var qryVal = 'APC';
    var props  = 'documentID.variantEffectOnGene.affectedGene';

    // Url building process
    var genbHost = 'genboree.org';
    var detailed = '&detailed=true'; // Enable full JSON report

    // Put together the resources and properties for the URL
    var rsrcPath = '/REST/v1/grp/' + grpName + '/kb/' + kbName + '/coll/' + collName + '/docs?';
    var propPath = 'matchProps=' + props + '&matchValue=' + qryVal;

    // Build the URL along with authorization tokens
    var url = buildURL(genbHost, gbLogin, usrPass, rsrcPath, propPath, detailed);

    // Send the URL to the Genboree server to get JSON response
    return 'services/restproxy.php?url=' + encodeURIComponent(url);
}


var GenboreeData = React.createClass({

    getInitialState: function() {
        return {gbData: []};
    },

    componentDidMount: function() {
        var proxyUrl = getGBDataURL();

        $.getJSON(proxyUrl, function(data) {
            this.setState({gbData: data.contents.data});
        }.bind(this));
    },

    render: function() {
        return (
            <div>
                {this.state.gbData.map(function(dataItem) {
                    itemData = dataItem.documentID;
                    return (
                        <div className="item">
                            <h2>{itemData.value}</h2>
                            <dl>
                                <div>{itemData.properties && itemData.properties.type ? <span><dt>{'Type: '}</dt><dd>{itemData.properties.type}</dd></span> : null}</div>
                                <div>{itemData.properties && itemData.properties.dbsnpId ? <span><dt>{'DB SNP ID: '}</dt><dd>{itemData.properties.dbsnpId.value}</dd></span> : null}</div>
                            </dl>
                        </div>
                    );
                })}
            </div>
        );
    }
});


React.renderComponent(
  <GenboreeData />,
  document.getElementById('output')
);
