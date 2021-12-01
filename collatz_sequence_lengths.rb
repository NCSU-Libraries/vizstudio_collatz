def calculate_sequence_length
  i = @n
  length = 1

  iterate = lambda do
    if i == 1
      return length
    else
      if i % 2 == 0
        i = i / 2
      else
        i = (i * 3) + 1
      end
      # sleep 0.01
      length += 1
      iterate.call
    end
  end

  iterate.call
end

@n = 1

while @n <= 1000000
  length = calculate_sequence_length
  # sleep 0.1
  puts "#{@n} - #{length}"
  @n += 1
end
