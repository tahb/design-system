FROM ruby:2.6-alpine as build

ENV BUNDLER_VERSION 2.1.4
ENV LANG=C.UTF-8 \
    BUNDLE_JOBS=6 \
    BUNDLE_RETRY=3

RUN apk add --no-cache --update build-base git jq

RUN mkdir -p /app
COPY Gemfile* /app/
WORKDIR /app

RUN gem install bundler -v $BUNDLER_VERSION && bundle install --with test && gem cleanup

RUN addgroup --gid 3000 ruby && \
    adduser --home /home/ruby --uid 3000 --ingroup ruby --disabled-password ruby

USER 3000

COPY . /app
