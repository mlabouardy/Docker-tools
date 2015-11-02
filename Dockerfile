FROM ubuntu
MAINTAINER mlabouardy <mohamed@labouardy.com>

#Install NodeJS, NPM, Grunt

RUN apt-get update && \
		apt-get -y install nodejs && \
		apt-get -y install npm && \
		npm install -g grunt-cli && \
		apt-get -y install ruby-full rubygems1.9 && \
	  gem install compass && \
	  apt-get -y install git
		

RUN ln -s /usr/bin/nodejs /usr/bin/node

#Clone project from Git 

WORKDIR /
RUN git clone https://github.com/mlabouardy/Docker-tools.git

#Install depandancies
RUN cd /Docker-tools; npm install
RUN  npm install bower -g
WORKDIR /Docker-tools
RUN bower install --allow-root

#Export Port
EXPOSE 9000

WORKDIR /Docker-tools
#Run app
CMD ["/usr/local/bin/grunt","serve"]
