Diagram(
        Choice(0, '-', Skip()),
        Choice(0, '0', Sequence('Digit 1-9', OneOrMore('Digit'))),
        Choice(1, Sequence('.', OneOrMore('Digit')), Skip()),
        Choice(0, Skip(), Sequence(Choice(0, 'e', 'E'), Choice(1, '+', Skip(), '-'), OneOrMore('Digit')))
	)