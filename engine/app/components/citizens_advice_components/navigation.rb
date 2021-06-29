# frozen_string_literal: true

module CitizensAdviceComponents
  class Navigation < Base
    attr_reader :links

    def initialize(links:)
      super
      @links = links
    end

    def render?
      links.present?
    end
  end
end
