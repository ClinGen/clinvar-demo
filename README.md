clinvar-demo
============

Demonstration of the genboree.com REST API on a website using a React component to retrieve and display data.


## Installation

After cloning this repo to your local directory, go to that directory and enter:

```
sudo npm install
```

This installs various libraries this project relies on. Then you need to build the project:

```
grunt
```

Now launch a web server (such as [MAMP](http://www.mamp.info/en/)) and visit the index.html page for this project. It displays the page, and then sends the REST request to genboree.com. The data is very large and can take as long as 30 seconds to retrieve, and you’ll see nothing to indicate this.

After the data is retrieved, it’s displayed in the window as a list of 1000 items.
