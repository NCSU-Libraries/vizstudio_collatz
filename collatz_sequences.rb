def generate_sequence
  i = @n

  iterate_and_print = lambda do
    print i

    if i == 1
      return true
    else
      if i % 2 == 0
        i = i / 2
      else
        i = (i * 3) + 1
      end
      # sleep 0.01
      print ', '
      iterate_and_print.call
    end
  end

  iterate_and_print.call
end

@n = 1

while @n <= 1000000
  generate_sequence
  puts; puts
  @n += 1
end
