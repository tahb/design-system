# frozen_string_literal: true

module CitizensAdviceComponents
  class CheckboxSingle < Base
    attr_reader :name, :error_message

    renders_one :checkbox, Checkable::Checkbox

    def initialize(name:, error_message: nil)
      super
      @name = name
      @error_message = error_message
    end

    def error?
      @error_message.present?
    end

    def render?
      checkbox.present?
    end
  end
end
